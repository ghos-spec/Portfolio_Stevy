import { readMultipartFormData } from 'h3';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirestoreAdmin } from '~/server/utils/firebaseAdmin';
import { getSupabaseServerClient } from '~/server/utils/supabaseServer';

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

const parseFormData = (formParts: Awaited<ReturnType<typeof readMultipartFormData>>) => {
  const fields: Record<string, string> = {};
  let imageFile: { data: Buffer; filename?: string; type?: string } | null = null;
  let videoFile: { data: Buffer; filename?: string; type?: string } | null = null;

  for (const part of formParts || []) {
    if (part.type) {
      if (part.name === 'image') {
        imageFile = { data: part.data, filename: part.filename, type: part.type };
      } else if (part.name === 'video') {
        videoFile = { data: part.data, filename: part.filename, type: part.type };
      }
    } else if (part.name) {
      fields[part.name] = part.data.toString('utf-8');
    }
  }

  return { fields, imageFile, videoFile };
};

const slugify = (value: string): string => {
  return (
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'projet'
  );
};

const assertFileValid = (file: { data: Buffer; filename?: string; type?: string } | null, allowedTypes: string[], label: string) => {
  if (!file) return;
  if (!file.type || !allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: `${label} : type de fichier non supporté` });
  }
  if (file.data.byteLength > 25 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: `${label} trop volumineux (max 25MB)` });
  }
};

const uploadToSupabase = async (
  file: { data: Buffer; filename?: string; type?: string } | null,
  bucket: string,
  prefix: string
) => {
  if (!file) return { url: '', path: '' };
  const client = getSupabaseServerClient();
  const extension = file.filename?.split('.').pop() ?? 'bin';
  const path = `${prefix}/${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`;
  const { error } = await client.storage.from(bucket).upload(path, file.data, {
    contentType: file.type || 'application/octet-stream',
    upsert: false
  });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Échec de l'upload ${error.message}` });
  }

  const { data: signedData, error: signedError } = await client.storage.from(bucket).createSignedUrl(path, 60 * 60 * 24 * 30);
  if (signedError || !signedData?.signedUrl) {
    throw createError({ statusCode: 500, statusMessage: `Impossible de générer l'URL publique (${signedError?.message})` });
  }

  return { url: signedData.signedUrl, path };
};

const removeFromSupabase = async (paths: (string | undefined)[], bucket: string) => {
  const toDelete = paths.filter(Boolean) as string[];
  if (!toDelete.length) return;
  const client = getSupabaseServerClient();
  const { error } = await client.storage.from(bucket).remove(toDelete);
  if (error) {
    console.warn('Supabase remove error', error.message);
  }
};

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Paramètre id manquant' });
  }

  const form = await readMultipartFormData(event);
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'FormData manquant' });
  }

  console.info('[api/projects/:id] content-type', event.node.req.headers['content-type']);
  const { fields, imageFile, videoFile } = parseFormData(form);
  console.info('[api/projects/:id] update payload', {
    id,
    fields,
    hasImage: !!imageFile,
    hasVideo: !!videoFile
  });

  assertFileValid(imageFile, ALLOWED_IMAGE_TYPES, 'Image');
  assertFileValid(videoFile, ALLOWED_VIDEO_TYPES, 'Vidéo');

  const db = getFirestoreAdmin();
  const docRef = db.collection('projects').doc(id);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    throw createError({ statusCode: 404, statusMessage: 'Projet introuvable' });
  }

  const existing = snapshot.data() || {};
  const config = useRuntimeConfig();
  const bucket = config.supabase?.bucket || 'projects-media';

  const updates: Record<string, any> = {};

  if (fields.name !== undefined) updates.name = fields.name.trim();
  if (fields.description !== undefined) updates.description = fields.description.trim();
  if (fields.status !== undefined) updates.status = fields.status;
  if (fields.githubUrl !== undefined) updates.githubUrl = fields.githubUrl;
  if (fields.liveUrl !== undefined) updates.liveUrl = fields.liveUrl;
  if (fields.tags !== undefined) {
    try {
      updates.tags = JSON.parse(fields.tags);
    } catch {
      updates.tags = [];
    }
  }

  if (fields.slug !== undefined) {
    const rawSlug = fields.slug.trim();
    if (rawSlug) {
      const base = slugify(rawSlug);
      let candidate = base;
      let suffix = 2;

      while (true) {
        const snapshotSlug = await db.collection('projects').where('slug', '==', candidate).get();
        const conflict = snapshotSlug.docs.find((doc) => doc.id !== id);
        if (!conflict) break;
        candidate = `${base}-${suffix++}`;
      }

      updates.slug = candidate;
    } else {
      updates.slug = '';
    }
  }

  const [imageUpload, videoUpload] = await Promise.all([
    uploadToSupabase(imageFile, bucket, 'projects/images'),
    uploadToSupabase(videoFile, bucket, 'projects/videos')
  ]);

  if (imageFile && imageUpload.url) {
    updates.imageUrl = imageUpload.url;
    updates.imagePath = imageUpload.path;
  }

  if (videoFile && videoUpload.url) {
    updates.videoUrl = videoUpload.url;
    updates.videoPath = videoUpload.path;
  }

  updates.updatedAt = FieldValue.serverTimestamp();

  await docRef.update(updates);

  if (imageFile && existing.imagePath) {
    await removeFromSupabase([existing.imagePath], bucket);
  }
  if (videoFile && existing.videoPath) {
    await removeFromSupabase([existing.videoPath], bucket);
  }

  const updatedDoc = await docRef.get();
  const updatedData = updatedDoc.data() || {};

  if (updatedData.status === 'Publié' && existing.status !== 'Publié') {
    await db.collection('notifications').add({
      title: 'Projet publié',
      message: updatedData.name || 'Un projet a été publié',
      read: false,
      createdAt: FieldValue.serverTimestamp(),
      type: 'project',
      projectId: id
    });
  }

  return { id, ...updatedData };
});

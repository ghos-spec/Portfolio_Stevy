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

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'FormData manquant' });
  }

  const { fields, imageFile, videoFile } = parseFormData(form);
  const name = fields.name?.trim();
  const description = fields.description?.trim();

  if (!name || !description) {
    throw createError({ statusCode: 400, statusMessage: 'Nom et description sont requis' });
  }

  assertFileValid(imageFile, ALLOWED_IMAGE_TYPES, 'Image');
  assertFileValid(videoFile, ALLOWED_VIDEO_TYPES, 'Vidéo');

  const tags = fields.tags ? JSON.parse(fields.tags) : [];
  const status = fields.status || 'Brouillon';
  const category = fields.category || 'Développement Web';
  const githubUrl = fields.githubUrl || '';
  const liveUrl = fields.liveUrl || '';

  const config = useRuntimeConfig();
  const bucket = config.supabase?.bucket || 'projects-media';

  const [imageUpload, videoUpload] = await Promise.all([
    uploadToSupabase(imageFile, bucket, 'projects/images'),
    uploadToSupabase(videoFile, bucket, 'projects/videos')
  ]);

  const db = getFirestoreAdmin();
  const docRef = await db.collection('projects').add({
    name,
    description,
    tags,
    category,
    status,
    githubUrl,
    liveUrl,
    imageUrl: imageUpload.url,
    videoUrl: videoUpload.url,
    imagePath: imageUpload.path,
    videoPath: videoUpload.path,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });

  if (status === 'Publié') {
    await db.collection('notifications').add({
      title: 'Nouveau projet publié',
      message: name,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
      type: 'project',
      projectId: docRef.id
    });
  }

  return {
    id: docRef.id,
    name,
    description,
    tags,
    category,
    status,
    githubUrl,
    liveUrl,
    imageUrl: imageUpload.url,
    videoUrl: videoUpload.url
  };
});

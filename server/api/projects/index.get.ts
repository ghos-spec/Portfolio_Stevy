import { getFirestoreAdmin } from '~/server/utils/firebaseAdmin';
import { getSupabaseServerClient } from '~/server/utils/supabaseServer';

type ProjectResponse = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category?: string;
  status?: string;
  slug?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  imagePath?: string;
  videoPath?: string;
  initials?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default defineEventHandler(async () => {
  const db = getFirestoreAdmin();
  const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();

  const config = useRuntimeConfig();
  const bucket = config.supabase?.bucket || 'projects-media';
  const supabase = getSupabaseServerClient();

  const projects: ProjectResponse[] = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data() || {};
      const createdAt = data.createdAt?.toDate?.();
      const updatedAt = data.updatedAt?.toDate?.();

      const ensureSignedUrl = async (currentUrl?: string, path?: string) => {
        if (!path) {
          return currentUrl || '';
        }
        const { data: signedData, error } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60 * 24 * 30);
        if (error || !signedData?.signedUrl) {
          return currentUrl || '';
        }
        return signedData.signedUrl;
      };

      const imageUrl = await ensureSignedUrl(data.imageUrl, data.imagePath);
      const videoUrl = await ensureSignedUrl(data.videoUrl, data.videoPath);

      const isoCreatedAt = createdAt ? createdAt.toISOString() : undefined;
      const isoUpdatedAt = updatedAt ? updatedAt.toISOString() : undefined;
      const dateValue = data.date?.toDate?.()?.toISOString?.() ?? data.date ?? isoCreatedAt ?? isoUpdatedAt ?? '';

      return {
        id: doc.id,
        name: data.name ?? 'Projet',
        description: data.description ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        category: data.category,
        status: data.status,
        slug: data.slug,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        imageUrl,
        videoUrl,
        imagePath: data.imagePath,
        videoPath: data.videoPath,
        initials: data.initials,
        date: dateValue,
        createdAt: isoCreatedAt,
        updatedAt: isoUpdatedAt
      } satisfies ProjectResponse;
    })
  );

  return projects;
});

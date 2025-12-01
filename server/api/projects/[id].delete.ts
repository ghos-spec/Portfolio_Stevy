import { getFirestoreAdmin } from '~/server/utils/firebaseAdmin';
import { getSupabaseServerClient } from '~/server/utils/supabaseServer';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Paramètre id manquant' });
  }

  const db = getFirestoreAdmin();
  const docRef = db.collection('projects').doc(id);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    throw createError({ statusCode: 404, statusMessage: 'Projet introuvable' });
  }

  const data = snapshot.data() || {};
  const config = useRuntimeConfig();
  const bucket = config.supabase?.bucket || 'projects-media';
  const pathsToDelete = [data.imagePath, data.videoPath].filter(Boolean) as string[];

  await docRef.delete();

  if (pathsToDelete.length) {
    const client = getSupabaseServerClient();
    const { error } = await client.storage.from(bucket).remove(pathsToDelete);
    if (error) {
      console.warn('Erreur suppression Supabase', error.message);
    }
  }

  return { success: true };
});

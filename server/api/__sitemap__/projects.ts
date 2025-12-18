import { getFirestoreAdmin } from '~/server/utils/firebaseAdmin';

export default defineEventHandler(async () => {
  try {
    const db = getFirestoreAdmin();
    const snapshot = await db
      .collection('projects')
      .where('status', '==', 'Publié')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      const slug = data.slug || doc.id;
      const updatedAt = data.updatedAt?.toDate?.();
      
      return {
        loc: `/projets/${slug}`,
        lastmod: updatedAt ? updatedAt.toISOString() : undefined,
        changefreq: 'monthly',
        priority: 0.8
      };
    });
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap des projets:', error);
    return [];
  }
});

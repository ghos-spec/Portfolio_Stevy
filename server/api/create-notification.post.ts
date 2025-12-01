import { initializeApp, cert, getApps, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const getFirebaseApp = () => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const config = useRuntimeConfig();
  const credentials = config.firebaseAdmin;

  if (!credentials?.projectId || !credentials?.clientEmail || !credentials?.privateKey) {
    throw createError({ statusCode: 500, statusMessage: 'Firebase Admin credentials not configured' });
  }

  return initializeApp({
    credential: cert({
      projectId: credentials.projectId,
      clientEmail: credentials.clientEmail,
      privateKey: credentials.privateKey
    })
  });
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Méthode non autorisée' });
  }

  const body = await readBody<{ title?: string; message?: string }>(event);

  if (!body?.title || !body?.message) {
    throw createError({ statusCode: 400, statusMessage: 'title et message requis' });
  }

  const app = getFirebaseApp();
  const db = getFirestore(app);

  await db.collection('notifications').add({
    title: body.title,
    message: body.message,
    read: false,
    createdAt: FieldValue.serverTimestamp()
  });

  return { success: true };
});

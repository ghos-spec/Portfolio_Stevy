import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let cachedDb: ReturnType<typeof getFirestore> | null = null;

const loadServiceAccountFromFile = () => {
  const candidates = [
    process.env.FIREBASE_ADMIN_CREDENTIALS_PATH,
    'service-account.json',
    'serviceAccount.json',
    'firebase-adminsdk.json',
    'portfolio-stevy-firebase-adminsdk-fbsvc-fa04ca9200.json'
  ].filter(Boolean) as string[];

  for (const relativePath of candidates) {
    const absolutePath = resolve(process.cwd(), relativePath);
    if (!existsSync(absolutePath)) continue;
    try {
      const raw = readFileSync(absolutePath, 'utf-8');
      return JSON.parse(raw);
    } catch (error) {
      console.warn('[firebaseAdmin] Impossible de lire le fichier de service account', relativePath, error);
    }
  }

  return null;
};

export const getFirestoreAdmin = () => {
  if (cachedDb) return cachedDb;

  const config = useRuntimeConfig();
  const runtimeCredentials = config.firebaseAdmin || {};
  const fileCredentials = (!runtimeCredentials.projectId || !runtimeCredentials.clientEmail || !runtimeCredentials.privateKey)
    ? loadServiceAccountFromFile()
    : null;

  const credentials = {
    projectId: runtimeCredentials.projectId || fileCredentials?.project_id,
    clientEmail: runtimeCredentials.clientEmail || fileCredentials?.client_email,
    privateKey: (runtimeCredentials.privateKey || fileCredentials?.private_key || '').replace(/\n/g, '\n')
  };

  if (!credentials.projectId || !credentials.clientEmail || !credentials.privateKey) {
    throw createError({ statusCode: 500, statusMessage: 'Firebase Admin credentials missing' });
  }

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: credentials.projectId,
          clientEmail: credentials.clientEmail,
          privateKey: credentials.privateKey
        })
      });

  cachedDb = getFirestore(app);
  return cachedDb;
};

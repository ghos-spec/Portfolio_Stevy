// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId
  };

  const isConfigValid = Object.values(firebaseConfig).every((value) => typeof value === 'string' && value.length > 0);

  const fallback = {
    provide: {
      firebase: {
        app: null,
        db: null,
        analytics: null,
        auth: null,
        storage: null
      }
    }
  };

  if (import.meta.server || !isConfigValid) {
    if (!isConfigValid && import.meta.client) {
      console.warn('[plugins/firebase] Configuration Firebase client incomplète, plugin désactivé');
    }
    return fallback;
  }

  try {
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    let analytics = null;
    if (firebaseConfig.measurementId) {
      const supported = await isAnalyticsSupported();
      if (supported) {
        analytics = getAnalytics(app);
      }
    }

    return {
      provide: {
        firebase: {
          app,
          db,
          analytics,
          auth,
          storage
        }
      }
    };
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Firebase:', error);
    return fallback;
  }
});

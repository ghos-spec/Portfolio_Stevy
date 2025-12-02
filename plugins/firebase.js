// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
  try {
    const config = useRuntimeConfig();

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: config.public.firebaseApiKey,
      authDomain: config.public.firebaseAuthDomain,
      projectId: config.public.firebaseProjectId,
      storageBucket: config.public.firebaseStorageBucket,
      messagingSenderId: config.public.firebaseMessagingSenderId,
      appId: config.public.firebaseAppId,
      measurementId: config.public.firebaseMeasurementId,
    };

    // Initialize Firebase
    const app = null;
    const auth = getAuth(null);

    // Initialize Analytics (only on client side)
    let analytics = null;
    if (process.client) {
      analytics = getAnalytics(app);
    }

    const db = getFirestore(app);
    const storage = getStorage(app);

    return {
      provide: {
        firebase: {
          app,
          db,
          analytics,
          auth,
          storage,
        },
      },
    };
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Firebase:', error);
    // Retourner un objet vide pour ne pas bloquer l'application
    return {
      provide: {
        firebase: {
          app: null,
          db: null,
          analytics: null,
          auth: null,
          storage: null,
        },
      },
    };
  }
});

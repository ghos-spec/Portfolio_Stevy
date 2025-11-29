// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
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
  const app = initializeApp(firebaseConfig);

  // Initialize Analytics (only on client side)
  let analytics = null;
  if (process.client) {
    analytics = getAnalytics(app);
  }

  const db = getFirestore(app);

  return {
    provide: {
      firebase: {
        app,
        db,
        analytics,
      },
    },
  };
});

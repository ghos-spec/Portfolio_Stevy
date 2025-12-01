import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onBeforeUnmount, reactive, ref } from 'vue';

type ProfileRecord = {
  initials: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  socials: { label: string; url: string }[];
};

const defaultProfile: ProfileRecord = {
  initials: 'SM',
  name: 'Stevy Mirian',
  email: 'stevy@portfolio.dev',
  phone: '',
  location: '',
  bio: '',
  socials: []
};

export const useProfileData = () => {
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;

  const profile = reactive<ProfileRecord>({ ...defaultProfile });
  const loading = ref(false);
  const saving = ref(false);
  const error = ref('');
  const success = ref('');
  const unsubscribers: (() => void)[] = [];

  const docRef = db ? doc(db, 'profile', 'admin') : null;

  const startListener = () => {
    if (!docRef) {
      error.value = 'Firebase non initialisé.';
      return;
    }

    loading.value = true;
    error.value = '';

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const data = snapshot.data();
        if (data) {
          profile.initials = data.initials || profile.name?.slice(0, 2).toUpperCase() || 'SM';
          profile.name = data.name || '';
          profile.email = data.email || '';
          profile.phone = data.phone || '';
          profile.location = data.location || '';
          profile.bio = data.bio || '';
          profile.socials = Array.isArray(data.socials) ? data.socials : [];
        }
        loading.value = false;
      },
      (err) => {
        console.error('profile listener error', err);
        error.value = "Impossible de charger le profil.";
        loading.value = false;
      }
    );

    unsubscribers.push(unsubscribe);
  };

  const stopListener = () => {
    unsubscribers.splice(0).forEach((fn) => fn && fn());
  };

  const saveProfile = async () => {
    if (!docRef) return;
    saving.value = true;
    error.value = '';
    success.value = '';

    try {
      await setDoc(
        docRef,
        {
          ...profile,
          initials: profile.name
            ? profile.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() || '')
                .join('')
            : profile.initials
        },
        { merge: true }
      );
      success.value = 'Profil mis à jour avec succès.';
    } catch (err) {
      console.error('saveProfile error', err);
      error.value = 'Impossible de sauvegarder le profil.';
    } finally {
      saving.value = false;
    }
  };

  if (process.client) {
    startListener();
    onBeforeUnmount(() => {
      stopListener();
    });
  }

  return {
    profile,
    loading,
    saving,
    error,
    success,
    saveProfile,
    refresh: () => {
      stopListener();
      startListener();
    }
  };
};

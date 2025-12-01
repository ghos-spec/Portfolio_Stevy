import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onBeforeUnmount, reactive, ref, watch } from 'vue';

type ToggleSetting = {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
};

type SettingsRecord = {
  notifications: ToggleSetting[];
  privacy: ToggleSetting[];
  theme: string;
  compact: boolean;
};

const defaultSettings: SettingsRecord = {
  notifications: [
    { key: 'email', label: 'Notifications email', description: 'Recevoir des alertes importantes par email', enabled: true },
    { key: 'message', label: 'Alertes de messages', description: 'Être notifié des nouveaux messages', enabled: true },
    { key: 'projects', label: 'Mises à jour des projets', description: 'Recevoir des notifications sur les projets', enabled: false }
  ],
  privacy: [
    { key: 'public', label: 'Profil public', description: 'Permettre à tous de voir votre profil', enabled: true },
    { key: 'email', label: 'Afficher l’email', description: 'Afficher votre email sur le portfolio', enabled: false },
    { key: 'phone', label: 'Afficher le téléphone', description: 'Afficher votre numéro sur le portfolio', enabled: false }
  ],
  theme: 'Dark',
  compact: false
};

const cloneToggleArray = (source: any, fallback: ToggleSetting[]) => {
  if (!Array.isArray(source)) {
    return fallback.map((item) => ({ ...item }));
  }
  return source.map((item: any, index: number) => ({
    key: typeof item?.key === 'string' && item.key.length ? item.key : fallback[index]?.key ?? `item-${index}`,
    label: typeof item?.label === 'string' && item.label.length ? item.label : fallback[index]?.label ?? 'Option',
    description:
      typeof item?.description === 'string' && item.description.length
        ? item.description
        : fallback[index]?.description ?? '',
    enabled: !!item?.enabled
  }));
};

const normalizeSettings = (data?: Partial<SettingsRecord>): SettingsRecord => ({
  notifications: cloneToggleArray(data?.notifications, defaultSettings.notifications),
  privacy: cloneToggleArray(data?.privacy, defaultSettings.privacy),
  theme: typeof data?.theme === 'string' && data.theme.length ? data.theme : defaultSettings.theme,
  compact: typeof data?.compact === 'boolean' ? data.compact : defaultSettings.compact
});

export const useSettingsData = () => {
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;

  const settings = reactive<SettingsRecord>(normalizeSettings());
  const loading = ref(false);
  const saving = ref(false);
  const error = ref('');
  const success = ref('');
  const unsubscribers: (() => void)[] = [];

  const docRef = db ? doc(db, 'settings', 'admin') : null;

  const applySettings = (payload?: Partial<SettingsRecord>) => {
    const normalized = normalizeSettings(payload);
    settings.notifications = normalized.notifications;
    settings.privacy = normalized.privacy;
    settings.theme = normalized.theme;
    settings.compact = normalized.compact;
  };

  const THEME_CLASS_MAP: Record<string, string> = {
    Dark: 'admin-theme-dark',
    Light: 'admin-theme-light',
    Auto: 'admin-theme-auto'
  };

  const ensureDocument = () => (typeof document !== 'undefined' ? document : null);

  const applyThemeClass = (theme: string) => {
    const docRefLocal = ensureDocument();
    if (!docRefLocal) return;
    const root = docRefLocal.documentElement;
    (Object.values(THEME_CLASS_MAP) as string[]).forEach((cls) => root.classList.remove(cls));
    const targetClass: string = THEME_CLASS_MAP[theme as keyof typeof THEME_CLASS_MAP] ?? THEME_CLASS_MAP.Dark;
    root.classList.add(targetClass);
  };

  const applyCompactClass = (isCompact: boolean) => {
    const docRefLocal = ensureDocument();
    if (!docRefLocal) return;
    const root = docRefLocal.documentElement;
    root.classList.toggle('admin-compact', !!isCompact);
  };

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
        const data = snapshot.data() as Partial<SettingsRecord> | undefined;
        applySettings(data);
        loading.value = false;
      },
      (err) => {
        console.error('settings listener error', err);
        error.value = 'Impossible de charger les paramètres.';
        loading.value = false;
      }
    );

    unsubscribers.push(unsubscribe);
  };

  const stopListener = () => {
    unsubscribers.splice(0).forEach((fn) => fn && fn());
  };

  const saveSettings = async () => {
    if (!docRef) {
      error.value = 'Firebase non initialisé.';
      return;
    }

    saving.value = true;
    error.value = '';
    success.value = '';

    try {
      const payload: SettingsRecord = {
        notifications: settings.notifications.map((item) => ({ ...item })),
        privacy: settings.privacy.map((item) => ({ ...item })),
        theme: settings.theme,
        compact: settings.compact
      };

      await setDoc(docRef, payload, { merge: true });
      success.value = 'Paramètres enregistrés avec succès.';
    } catch (err) {
      console.error('saveSettings error', err);
      error.value = 'Impossible de sauvegarder les paramètres.';
    } finally {
      saving.value = false;
    }
  };

  if (process.client) {
    startListener();
    watch(
      () => settings.theme,
      (value) => {
        applyThemeClass(value);
      },
      { immediate: true }
    );

    watch(
      () => settings.compact,
      (value) => {
        applyCompactClass(value);
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      stopListener();
    });
  }

  return {
    settings,
    loading,
    saving,
    error,
    success,
    saveSettings,
    refresh: () => {
      stopListener();
      startListener();
    }
  };
};

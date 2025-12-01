import { doc, collection, orderBy, limit, query, onSnapshot } from 'firebase/firestore';
import { onBeforeUnmount, ref } from 'vue';

type StatCard = {
  key: string;
  label: string;
  value: string;
  delta: string;
  bg: string;
  icon: string[];
};

type ActivityItem = {
  title: string;
  time: string;
  bg: string;
  icon: string[];
};

const defaultStatCards: StatCard[] = [
  { key: 'views', label: 'Vues totales', value: '0', delta: '+0', bg: 'bg-cyan-500/10 text-cyan-400', icon: ['M5 5h14v14H5z', 'M5 12h14', 'M12 5v14'] },
  { key: 'projects', label: 'Projets', value: '0', delta: '+0', bg: 'bg-emerald-500/10 text-emerald-400', icon: ['M4 7h16', 'M4 12h16', 'M4 17h16'] },
  { key: 'messages', label: 'Messages', value: '0', delta: '+0', bg: 'bg-indigo-500/10 text-indigo-400', icon: ['M4 6h16v12H4z', 'm4 6 8 6 8-6'] },
  { key: 'engagement', label: 'Engagement', value: '0%', delta: '+0%', bg: 'bg-amber-500/10 text-amber-400', icon: ['M12 5v14', 'M19 12a7 7 0 1 0-14 0'] }
];

const quickActions = [
  { label: 'Ajouter un projet', description: 'Créer un nouveau projet', bg: 'bg-cyan-500/10 text-cyan-400', icon: ['M12 5v14', 'M5 12h14'] },
  { label: 'Uploader des médias', description: 'Ajouter images ou vidéos', bg: 'bg-indigo-500/10 text-indigo-400', icon: ['M4 16l4-4a2 2 0 0 1 2.82 0L16 17', 'M14 14l1.5-1.5a2 2 0 0 1 2.82 0L20 14'] },
  { label: 'Modifier le profil', description: 'Actualiser vos informations', bg: 'bg-amber-500/10 text-amber-400', icon: ['M4 20h4l10-10-4-4L4 16z', 'M14 6l4 4'] },
  { label: 'Voir le portfolio', description: 'Consulter le site en ligne', bg: 'bg-emerald-500/10 text-emerald-400', icon: ['M2 12h20', 'M12 2v20'] }
];

export const useDashboardData = () => {
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;

  const statCards = ref<StatCard[]>(defaultStatCards);
  const activities = ref<ActivityItem[]>([]);
  const loading = ref(false);
  const error = ref('');
  const unsubscribers: (() => void)[] = [];
  const previousCounts: Record<string, number> = {};

  const formatDelta = (key: string, value: number) => {
    const prev = previousCounts[key];
    const delta = prev === undefined ? 0 : value - prev;
    previousCounts[key] = value;
    const formattedValue = key === 'engagement' ? `${value}%` : value.toString();
    const formattedDelta = `${delta >= 0 ? '+' : ''}${key === 'engagement' ? delta.toFixed(1) + '%' : delta}`;

    statCards.value = statCards.value.map((card) =>
      card.key === key
        ? {
            ...card,
            value: formattedValue,
            delta: formattedDelta
          }
        : card
    );
  };

  const startRealtimeListeners = () => {
    if (!db) {
      error.value = 'Firebase non initialisé.';
      return;
    }

    loading.value = true;
    error.value = '';

    const listenToCollectionCount = (key: string, path: string) => {
      const unsubscribe = onSnapshot(
        collection(db, path),
        (snapshot) => {
          formatDelta(key, snapshot.size);
          loading.value = false;
        },
        (err) => {
          console.error(`${key} listener error`, err);
          error.value = `Impossible de charger ${key}.`;
          loading.value = false;
        }
      );
      unsubscribers.push(unsubscribe);
    };

    const listenToDocValue = (key: string, docPath: string, field: string) => {
      const unsubscribe = onSnapshot(
        doc(db, docPath),
        (snapshot) => {
          const data = snapshot.data() || {};
          formatDelta(key, Number(data[field]) || 0);
          loading.value = false;
        },
        (err) => {
          console.error(`${key} doc listener error`, err);
          error.value = `Impossible de charger ${key}.`;
          loading.value = false;
        }
      );
      unsubscribers.push(unsubscribe);
    };

    listenToCollectionCount('projects', 'projects');
    listenToCollectionCount('messages', 'messages');
    listenToDocValue('views', 'analytics/summary', 'views');
    listenToDocValue('engagement', 'analytics/summary', 'engagement');

    const activitiesUnsub = onSnapshot(
      query(collection(db, 'activities'), orderBy('createdAt', 'desc'), limit(5)),
      (snapshot) => {
        activities.value = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            title: data.title ?? 'Activité',
            time: data.time ?? 'Date inconnue',
            bg: data.bg ?? 'bg-white/10 text-white',
            icon: data.icon ?? ['M5 5h14v14H5z', 'M5 12h14']
          };
        });
      },
      (err) => {
        console.error('activities listener error', err);
        error.value = 'Impossible de charger les activités récentes.';
      }
    );
    unsubscribers.push(activitiesUnsub);
  };

  const stopRealtimeListeners = () => {
    unsubscribers.splice(0).forEach((fn) => fn && fn());
  };

  const refresh = async () => {
    stopRealtimeListeners();
    startRealtimeListeners();
  };

  if (process.client) {
    startRealtimeListeners();
    onBeforeUnmount(() => {
      stopRealtimeListeners();
    });
  }

  return {
    loading,
    error,
    statCards,
    activities,
    quickActions,
    refresh
  };
};

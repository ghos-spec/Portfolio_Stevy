import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { onBeforeUnmount, ref, computed } from 'vue';

type MessageRecord = {
  id: string;
  sender: string;
  subject: string;
  email: string;
  content: string;
  date: string;
  unread: boolean;
};

export const useMessagesData = () => {
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;

  const messages = ref<MessageRecord[]>([]);
  const loading = ref(false);
  const error = ref('');
  const unsubscribers: (() => void)[] = [];

  const startRealtimeListener = () => {
    if (!db) {
      error.value = 'Firebase non initialisé.';
      return;
    }

    loading.value = true;
    error.value = '';

    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        messages.value = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() || {};
          const createdAt = data.createdAt?.toDate?.();
          return {
            id: docSnap.id,
            sender: data.name || data.sender || 'Expéditeur',
            subject: data.subject || 'Sans objet',
            email: data.email || 'contact@example.com',
            content: data.message || data.content || '',
            date: createdAt ? createdAt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Date inconnue',
            unread: data.unread === undefined ? true : !!data.unread
          } satisfies MessageRecord;
        });
        loading.value = false;
      },
      (err) => {
        console.error('messages listener error', err);
        error.value = 'Impossible de charger les messages.';
        loading.value = false;
      }
    );

    unsubscribers.push(unsubscribe);
  };

  const stopRealtimeListener = () => {
    unsubscribers.splice(0).forEach((fn) => fn && fn());
  };

  if (process.client) {
    startRealtimeListener();
    onBeforeUnmount(() => {
      stopRealtimeListener();
    });
  }

  const unreadCount = computed(() => messages.value.filter((msg) => msg.unread).length);

  return {
    messages,
    loading,
    error,
    unreadCount,
    refresh: () => {
      stopRealtimeListener();
      startRealtimeListener();
    }
  };
};

import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, limit, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';

type HeaderUser = {
  name: string;
  email: string;
  location?: string;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  time: string;
};

const formatInitials = (name: string) => {
  if (!name) return 'SM';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

const formatRelativeTime = (date?: Date) => {
  if (!date) return "À l'instant";
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days} j`;
};

let notificationsUnsubscribe: (() => void) | null = null;

export const useAdminHeader = () => {
  const { $firebase } = useNuxtApp();
  const auth = $firebase.auth;
  const db = $firebase.db;

  const user = useState<HeaderUser>('admin-user', () => ({
    name: 'Stevy Mirian',
    email: 'admin@portfolio.dev',
    location: 'San Francisco, CA'
  }));

  const notifications = useState<NotificationItem[]>('admin-notifications', () => []);
  const isInit = useState('admin-header-init', () => false);

  const initials = computed(() => formatInitials(user.value.name));
  const unreadCount = computed(() => notifications.value.filter((notif) => !notif.read).length);

  const setUserFromAuth = (firebaseUser: typeof auth.currentUser) => {
    if (!firebaseUser) return;
    user.value = {
      name: firebaseUser.displayName || user.value.name,
      email: firebaseUser.email || user.value.email,
      location: user.value.location
    };
  };

  const startAuthListener = () => {
    if (!auth) return;
    if (auth.currentUser) {
      setUserFromAuth(auth.currentUser);
    }
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserFromAuth(firebaseUser);
      }
    });
  };

  const startNotificationsListener = () => {
    if (!db || notificationsUnsubscribe) return;
    const notificationsQuery = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(6));
    notificationsUnsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      notifications.value = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const createdAt = data.createdAt?.toDate?.() ?? undefined;
        return {
          id: docSnap.id,
          title: data.title ?? 'Notification',
          message: data.message ?? '',
          read: !!data.read,
          time: formatRelativeTime(createdAt)
        };
      });
    });
  };

  const markNotificationAsRead = async (id: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (error) {
      console.error('markNotificationAsRead error', error);
    }
  };

  if (process.client && !isInit.value) {
    startAuthListener();
    startNotificationsListener();
    isInit.value = true;
  }

  return {
    user,
    initials,
    notifications,
    unreadCount,
    markNotificationAsRead
  };
};

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-white/5 bg-[#071327] text-white shadow-2xl transition-transform duration-300 lg:static lg:h-screen lg:sticky lg:top-0 lg:self-start lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="flex items-center justify-between px-6 pt-8 pb-6">
      <img src="/logo/stevyLogo.svg" alt="SM logo" class="h-24" />
      <button class="rounded-full p-2 text-white/60 transition hover:bg-white/5 hover:text-white lg:hidden" @click="$emit('close')">
        <svg viewBox="0 0 24 24" class="h-5 w-5">
          <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <svg viewBox="0 0 24 24" class="hidden h-4 w-4 text-white/40 lg:block">
        <path d="m15 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <nav class="flex-1 space-y-2 px-4">
      <NuxtLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
        :class="isActive(item)
          ? 'bg-[#3BC0FF] text-[#06203B] shadow-lg shadow-cyan-500/30'
          : 'text-white/70 hover:text-white hover:bg-white/5'"
      >
        <span class="flex h-8 w-8 items-center justify-center rounded-lg" :class="isActive(item) ? 'bg-white/20 text-[#06203B]' : 'bg-white/5 text-white'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
            <path
              v-for="(path, index) in item.icon"
              :key="index"
              :d="path"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div class="border-t border-white/5 px-6 py-6">
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="loggingOut"
        @click="handleLogout"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
          <path d="M9 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="m16 17 5-5-5-5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21 12H9" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ loggingOut ? 'Déconnexion…' : 'Déconnexion' }}</span>
      </button>
      <p v-if="logoutError" class="mt-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">{{ logoutError }}</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { useAuth } from '~/composables/useAuth';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const { isOpen } = toRefs(props);
const { logout } = useAuth();
const loggingOut = ref(false);
const logoutError = ref('');

defineEmits(['close']);

const route = useRoute();

const navItems = [
  {
    label: 'Tableau de bord',
    to: '/admin',
    icon: [
      'M4 4h6v6H4z',
      'M14 4h6v6h-6z',
      'M4 14h6v6H4z',
      'M14 14h6v6h-6z'
    ]
  },
  {
    label: 'Projets',
    to: '/admin/projects',
    icon: [
      'M4 7h16',
      'M4 12h16',
      'M4 17h16'
    ]
  },
  {
    label: 'Messages',
    to: '/admin/messages',
    icon: [
      'M4 6h16v12H4z',
      'm4 6 8 7 8-7'
    ]
  },
  {
    label: 'Profil',
    to: '/admin/profile',
    icon: [
      'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      'M4 20a8 8 0 0 1 16 0'
    ]
  },
  {
    label: 'Paramètres',
    to: '/admin/settings',
    icon: [
      'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
      'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3.4a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.6 5a1.65 1.65 0 0 0 1-1.51V3.4a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19 8.6c0 .66.26 1.3.73 1.77.47.47 1.11.73 1.77.73h.09a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'
    ]
  }
];

const isActive = (item) => route.path === item.to;

const handleLogout = async () => {
  if (loggingOut.value) return;
  logoutError.value = '';
  loggingOut.value = true;
  try {
    await logout();
    await navigateTo('/admin/login');
  } catch (error) {
    console.error('logout error', error);
    logoutError.value = "Impossible de vous déconnecter. Veuillez réessayer.";
  } finally {
    loggingOut.value = false;
  }
};
</script>

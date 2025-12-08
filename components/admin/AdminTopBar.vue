<template>
  <header class="sticky top-0 z-30 flex flex-col gap-4 rounded-3xl border border-white/5 bg-[#0B1C34]/95 px-6 py-5 text-white backdrop-blur supports-backdrop-blur:bg-[#0B1C34]/80 shadow-lg shadow-black/10 lg:flex-row lg:items-center lg:justify-between">
    <div class="flex-1">
      <p class="text-sm uppercase tracking-[0.4em] text-white/40">{{ subtitle }}</p>
      <h1 class="text-2xl font-bold">{{ title }}</h1>
    </div>

    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end lg:gap-4">
      <button type="button" class="self-end rounded-2xl border border-white/15 p-3 text-white/70 transition hover:text-white lg:hidden" @click="$emit('toggle-sidebar')">
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
        </svg>
      </button>

      <label class="flex w-full items-center gap-3 rounded-full border border-white/10 bg-[#09172C] px-5 py-2 text-white/70 focus-within:border-cyan-400 lg:w-auto">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4.35-4.35" stroke-linecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Rechercher..."
          class="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none lg:w-48"
        />
      </label>

      <div class="relative flex items-center gap-4">
        <button
          type="button"
          class="relative rounded-full bg-white/5 p-3 text-white/70 transition hover:text-white"
          @click="toggleNotifications"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-semibold text-[#071327]"
          >
            {{ unreadCount }}
          </span>
        </button>

        <div
          v-if="showNotifications"
          class="absolute right-0 top-12 z-20 w-72 space-y-3 rounded-2xl border border-white/10 bg-[#0B1C34] p-4 shadow-xl"
        >
          <div class="flex items-center justify-between text-sm font-semibold">
            <span>Notifications</span>
            <button class="text-xs text-cyan-400 hover:text-cyan-300" @click="closeNotifications">Fermer</button>
          </div>
          <p v-if="visibleNotifications.length === 0" class="text-sm text-white/60">Aucune notification.</p>
          <ul v-else class="space-y-3">
            <li
              v-for="notification in visibleNotifications"
              :key="notification.id"
              class="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/80"
            >
              <div class="flex items-center justify-between">
                <p class="font-semibold">{{ notification.title }}</p>
                <span class="text-xs text-white/50">{{ notification.time }}</span>
              </div>
              <p class="text-xs text-white/60">{{ notification.message }}</p>
              <button
                v-if="!notification.read"
                class="mt-2 text-xs text-cyan-400 hover:text-cyan-300"
                @click="markAsRead(notification.id)"
              >
                Marquer comme lu
              </button>
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-2">
          <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-semibold">
            {{ computedInitials }}
          </div>
          <div class="hidden text-right sm:block">
            <p class="text-sm font-semibold">{{ profile.name }}</p>
            <p class="text-xs text-white/60">{{ profile.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useAdminHeader } from '~/composables/useAdminHeader';
import { useProfileData } from '~/composables/useProfileData';

const { profile, loading, saving, error, success, saveProfile, refresh } = useProfileData();

const computedInitials = computed(() => {
  if (profile.initials) return profile.initials;
  return profile.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('')
    : 'SM';
});

const props = defineProps({
  title: {
    type: String,
    default: 'Tableau de bord'
  },
  subtitle: {
    type: String,
    default: "Vue d'ensemble"
  }
});

const { title, subtitle } = toRefs(props);

const { user, initials, notifications, unreadCount, markNotificationAsRead } = useAdminHeader();
const visibleNotifications = computed(() => notifications.value.filter((notif) => !notif.read));
const showNotifications = ref(false);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const closeNotifications = () => {
  showNotifications.value = false;
};

const markAsRead = async (id: string) => {
  await markNotificationAsRead(id);
};
</script>

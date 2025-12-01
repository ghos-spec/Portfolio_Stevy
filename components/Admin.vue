<template>
  <div class="flex min-h-screen bg-[#040914] text-white">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
      @click="toggleSidebar(false)"
    ></div>

    <AdminSidebar :is-open="isSidebarOpen" @close="toggleSidebar(false)" />

    <div class="flex-1 p-4 space-y-6 sm:p-8 lg:p-10">
      <AdminTopBar
        :title="currentSection.title"
        :subtitle="currentSection.subtitle"
        @toggle-sidebar="toggleSidebar(true)"
      />

      <component :is="currentSection.component" />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';

import AdminSidebar from '~/components/admin/AdminSidebar.vue';
import AdminTopBar from '~/components/admin/AdminTopBar.vue';
import AdminDashboardContent from '~/components/admin/AdminDashboardContent.vue';
import AdminProjectsContent from '~/components/admin/AdminProjectsContent.vue';
import AdminMessagesContent from '~/components/admin/AdminMessagesContent.vue';
import AdminProfileContent from '~/components/admin/AdminProfileContent.vue';
import AdminSettingsContent from '~/components/admin/AdminSettingsContent.vue';

const isSidebarOpen = ref(false);
const route = useRoute();

const sections = {
  dashboard: {
    title: 'Tableau de bord',
    subtitle: "Vue d'ensemble",
    component: AdminDashboardContent
  },
  projects: {
    title: 'Projets',
    subtitle: 'Gestion des projets',
    component: AdminProjectsContent
  },
  messages: {
    title: 'Messages',
    subtitle: 'Vos conversations',
    component: AdminMessagesContent
  },
  profile: {
    title: 'Profil',
    subtitle: 'Vos informations personnelles',
    component: AdminProfileContent
  },
  settings: {
    title: 'Paramètres',
    subtitle: 'Configurez votre espace admin',
    component: AdminSettingsContent
  }
};

const currentSection = computed(() => {
  if (route.path.startsWith('/admin/settings')) {
    return sections.settings;
  }
  if (route.path.startsWith('/admin/profile')) {
    return sections.profile;
  }
  if (route.path.startsWith('/admin/messages')) {
    return sections.messages;
  }
  if (route.path.startsWith('/admin/projects')) {
    return sections.projects;
  }
  return sections.dashboard;
});

const toggleSidebar = (value) => {
  isSidebarOpen.value = typeof value === 'boolean' ? value : !isSidebarOpen.value;
};

onMounted(() => {
  if (process.client) {
    document.body.classList.add('admin-layout');
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    document.body.classList.remove('admin-layout');
  }
});
</script>

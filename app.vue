<template>
  <div class="min-h-screen bg-[#020614] text-white">
    <GlobalLoader />
    <SiteHeader v-if="showHeader" />
    <main class="pt-0">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import SiteHeader from '~/components/SiteHeader.vue';
import GlobalLoader from '~/components/GlobalLoader.vue';

const route = useRoute();
const showHeader = computed(() => !route.path.startsWith('/admin'));
</script>

<style>
@import '~/assets/css/main.css';
</style>

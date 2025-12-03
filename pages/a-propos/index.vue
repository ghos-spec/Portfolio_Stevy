<template>
  <div class="min-h-screen bg-[#020810]">
    <AboutSection />
    <AboutTimeline />
    <FuturisticFooter />
  </div>
</template>

<script setup>
import AboutSection from '~/components/AboutSection.vue';
import AboutTimeline from '~/components/AboutTimeline.vue';
import FuturisticFooter from '~/components/FuturisticFooter.vue';

useHead({
  title: 'À Propos | Stevy OBAME - Développeur Full-Stack',
  meta: [
    { name: 'description', content: 'Découvrez le parcours de Stevy OBAME, développeur Full-Stack passionné basé à Libreville, Gabon.' }
  ]
});
</script>

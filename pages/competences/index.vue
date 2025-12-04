<template>
  <div class="min-h-screen bg-[#020810]">
    <!-- Skills Section Content will go here -->
    <SkillsSection />
    <FuturisticFooter />
  </div>
</template>

<script setup>
import FuturisticFooter from '~/components/FuturisticFooter.vue';
import SkillsSection from '~/components/SkillsSection.vue';

useHead({
  title: 'Compétences | Stevy OBAME - Développeur Full-Stack',
  meta: [
    { name: 'description', content: 'Découvrez les compétences techniques de Stevy OBAME : Vue.js, Nuxt, TypeScript, Firebase et plus.' }
  ]
});
</script>

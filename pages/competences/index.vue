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
  title: 'Compétences | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)',
  meta: [
    {
      name: 'description',
      content:
        "Découvrez les compétences de Stevy OBAME en développement web (Vue.js, Nuxt, TypeScript, Firebase...) et en design graphique."
    }
  ]
});
</script>

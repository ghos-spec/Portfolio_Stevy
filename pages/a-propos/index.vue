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
  title: 'À propos | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)',
  meta: [
    {
      name: 'description',
      content:
        "Découvrez le parcours de Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon), et sa manière d'accompagner vos projets digitaux et visuels."
    }
  ]
});
</script>

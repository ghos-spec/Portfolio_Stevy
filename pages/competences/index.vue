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
    },
    {
      property: 'og:title',
      content: 'Compétences | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      property: 'og:description',
      content:
        "Découvrez les compétences de Stevy OBAME en développement web (Vue.js, Nuxt, TypeScript, Firebase...) et en design graphique."
    },
    {
      property: 'og:image',
      content: '/competence.png'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Compétences | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      name: 'twitter:description',
      content:
        "Découvrez les compétences de Stevy OBAME en développement web (Vue.js, Nuxt, TypeScript, Firebase...) et en design graphique."
    },
    {
      name: 'twitter:image',
      content: '/competence.png'
    }
  ]
});
</script>

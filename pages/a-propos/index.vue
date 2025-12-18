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

const requestUrl = useRequestURL();
const aboutImage = new URL('/a-propos.png', requestUrl.origin).href;

const { breadcrumbSchema, personSchema, addStructuredData } = useStructuredData();

const breadcrumbs = breadcrumbSchema([
  { name: 'Accueil', url: '/' },
  { name: 'À propos', url: '/a-propos' }
]);

addStructuredData([breadcrumbs, personSchema()]);

useHead({
  title: 'À propos | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)',
  meta: [
    {
      name: 'description',
      content:
        "Découvrez le parcours de Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon), et sa manière d'accompagner vos projets digitaux et visuels."
    },
    {
      property: 'og:title',
      content: 'À propos | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      property: 'og:description',
      content:
        "Découvrez le parcours de Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon), et sa manière d'accompagner vos projets digitaux et visuels."
    },
    {
      property: 'og:image',
      content: aboutImage
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
      content: 'À propos | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      name: 'twitter:description',
      content:
        "Découvrez le parcours de Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon), et sa manière d'accompagner vos projets digitaux et visuels."
    },
    {
      name: 'twitter:image',
      content: aboutImage
    }
  ]
});
</script>

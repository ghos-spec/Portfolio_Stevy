<template>
  <div class="min-h-screen bg-[#020810]">
    <HeroSection />
    <SignatureSection />
    <!-- Other sections incoming -->
    <FuturisticFooter />
  </div>
</template>

<script setup>
import SiteHeader from '~/components/SiteHeader.vue';
import HeroSection from '~/components/HeroSection.vue';
import SignatureSection from '~/components/SignatureSection.vue';
import FuturisticFooter from '~/components/FuturisticFooter.vue';

useHead({
  title: 'Accueil | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)',
  meta: [
    {
      name: 'description',
      content:
        "Portfolio de Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon). Création de sites web modernes, identités visuelles et contenus créatifs pour des clients au Gabon et à l'international."
    },
    {
      property: 'og:title',
      content: 'Accueil | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      property: 'og:description',
      content:
        "Portfolio de Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon). Création de sites web modernes, identités visuelles et contenus créatifs pour des clients au Gabon et à l'international."
    },
    {
      property: 'og:image',
      content: '/logo/SO.png'
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
      content: 'Accueil | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      name: 'twitter:description',
      content:
        "Portfolio de Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon). Création de sites web modernes, identités visuelles et contenus créatifs pour des clients au Gabon et à l'international."
    },
    {
      name: 'twitter:image',
      content: '/logo/SO.png'
    }
  ]
});
</script>
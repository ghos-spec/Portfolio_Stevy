<template>
  <div class="min-h-screen bg-[#020810]">
    <ContactSection />
    <FuturisticFooter />
  </div>
</template>

<script setup>
import SiteHeader from '~/components/SiteHeader.vue';
import ContactSection from '~/components/ContactSection.vue';
import FuturisticFooter from '~/components/FuturisticFooter.vue';

useHead({
  title: 'Contact | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)',
  meta: [
    {
      name: 'description',
      content:
        "Contactez Stevy OBAME pour vos projets web et graphiques. Développeur web & designer graphique freelance à Libreville (Gabon), disponible pour des missions au Gabon et à l'international."
    },
    {
      property: 'og:title',
      content: 'Contact | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      property: 'og:description',
      content:
        "Contactez Stevy OBAME pour vos projets web et graphiques. Développeur web & designer graphique freelance à Libreville (Gabon), disponible pour des missions au Gabon et à l'international."
    },
    {
      property: 'og:image',
      content: '/logo/SO.jpg'
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
      content: 'Contact | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      name: 'twitter:description',
      content:
        "Contactez Stevy OBAME pour vos projets web et graphiques. Développeur web & designer graphique freelance à Libreville (Gabon), disponible pour des missions au Gabon et à l'international."
    },
    {
      name: 'twitter:image',
      content: '/logo/SO.jpg'
    }
  ]
});
</script>

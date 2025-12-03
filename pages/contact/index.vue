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
  title: 'Contact | Stevy OBAME - Développeur Full-Stack',
  meta: [
    {
      name: 'description',
      content: 'Contactez Stevy OBAME pour vos projets web. Développeur Full-Stack disponible pour missions et collaborations.'
    }
  ]
});
</script>

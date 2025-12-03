<template>
  <div class="min-h-screen bg-[#020810]">
    <!-- Projects Section Content -->
    <section class="relative py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#5EDFFF]/5 border border-[#5EDFFF]/20 rounded-full">
            <span class="w-2 h-2 bg-[#57F2CB] rounded-full animate-pulse"></span>
            <span class="text-sm text-[#5EDFFF] font-mono">projects.showcase()</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes <span class="text-[#5EDFFF]">Projets</span>
          </h1>
          <p class="max-w-xl mx-auto text-white/50">
            Une sélection de projets sur lesquels j'ai travaillé, démontrant mes compétences et ma créativité.
          </p>
        </div>
        
        <!-- Placeholder for projects -->
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="project in projects" :key="project.title" class="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#5EDFFF]/30 transition-all">
            <div class="aspect-video bg-gradient-to-br from-[#5EDFFF]/20 to-[#57F2CB]/10"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-[#5EDFFF] transition-colors">{{ project.title }}</h3>
              <p class="text-white/50 text-sm mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.tech" :key="tech" class="px-3 py-1 text-xs bg-[#5EDFFF]/10 text-[#5EDFFF] rounded-full">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <FuturisticFooter />
  </div>
</template>

<script setup>
import FuturisticFooter from '~/components/FuturisticFooter.vue';

useHead({
  title: 'Projets | Stevy OBAME - Développeur Full-Stack',
  meta: [
    { name: 'description', content: 'Découvrez les projets réalisés par Stevy OBAME : applications web, sites vitrines et plus.' }
  ]
});

const projects = [
  {
    title: 'Portfolio Personnel',
    description: 'Site portfolio moderne avec animations et design futuriste.',
    tech: ['Nuxt', 'Tailwind', 'TypeScript']
  },
  {
    title: 'Application E-commerce',
    description: 'Plateforme de vente en ligne avec panier et paiement intégré.',
    tech: ['Vue.js', 'Firebase', 'Stripe']
  },
  {
    title: 'Dashboard Admin',
    description: 'Interface d\'administration complète avec analytics et gestion.',
    tech: ['Nuxt', 'Firebase', 'Chart.js']
  },
  {
    title: 'Application Mobile',
    description: 'Application cross-platform pour la gestion de tâches.',
    tech: ['Vue.js', 'Capacitor', 'Firebase']
  }
];
</script>

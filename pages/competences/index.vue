<template>
  <div class="min-h-screen bg-[#020810]">
    <!-- Skills Section Content will go here -->
    <section class="relative py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#5EDFFF]/5 border border-[#5EDFFF]/20 rounded-full">
            <span class="w-2 h-2 bg-[#57F2CB] rounded-full animate-pulse"></span>
            <span class="text-sm text-[#5EDFFF] font-mono">skills.load()</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes <span class="text-[#5EDFFF]">Compétences</span>
          </h1>
          <p class="max-w-xl mx-auto text-white/50">
            Technologies et outils que je maîtrise pour créer des expériences digitales exceptionnelles.
          </p>
        </div>
        
        <!-- Placeholder for skills content -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="skill in skills" :key="skill.name" class="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#5EDFFF]/30 transition-all">
            <Icon :icon="skill.icon" class="w-10 h-10 text-[#5EDFFF] mb-4" />
            <h3 class="text-lg font-semibold text-white mb-2">{{ skill.name }}</h3>
            <p class="text-white/50 text-sm">{{ skill.description }}</p>
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
  title: 'Compétences | Stevy OBAME - Développeur Full-Stack',
  meta: [
    { name: 'description', content: 'Découvrez les compétences techniques de Stevy OBAME : Vue.js, Nuxt, TypeScript, Firebase et plus.' }
  ]
});

const skills = [
  { name: 'Vue.js / Nuxt', icon: 'mdi:vuejs', description: 'Développement d\'applications web modernes et réactives.' },
  { name: 'TypeScript', icon: 'mdi:language-typescript', description: 'Code robuste et maintenable avec typage statique.' },
  { name: 'Firebase', icon: 'mdi:firebase', description: 'Backend as a Service, authentification et base de données temps réel.' },
  { name: 'Tailwind CSS', icon: 'mdi:tailwind', description: 'Styling rapide et responsive avec utility-first CSS.' },
  { name: 'Node.js', icon: 'mdi:nodejs', description: 'Développement backend et APIs RESTful.' },
  { name: 'Git', icon: 'mdi:git', description: 'Versioning et collaboration efficace.' }
];
</script>

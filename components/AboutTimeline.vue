<template>
  <section class="relative py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mb-14 flex flex-col gap-4 text-center">
        <div class="mx-auto inline-flex items-center gap-2 rounded-full border border-[#5EDFFF]/20 bg-[#5EDFFF]/5 px-5 py-2">
          <span class="h-2 w-2 animate-pulse rounded-full bg-[#57F2CB]"></span>
          <span class="font-mono text-sm tracking-widest text-[#5EDFFF]">timeline.progress()</span>
        </div>
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-white/40">Mon parcours</p>
          <h2 class="mt-2 text-3xl font-semibold text-white md:text-4xl">Expériences clés & apprentissages</h2>
        </div>
        <p class="mx-auto max-w-3xl text-base text-white/60">
          Chaque étape combine développement web, design et accompagnement client afin de livrer des solutions cohérentes
          et mémorables.
        </p>
      </div>

      <div class="relative">
        <div class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#5EDFFF]/30 to-transparent"></div>
        <div class="flex flex-col gap-10">
          <div
            v-for="(item, index) in timeline"
            :key="item.title"
            class="group grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
          >
            <div class="justify-self-end text-right" :class="{ 'md:order-1': index % 2 !== 0, 'md:order-3': index % 2 === 0 }">
              <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/60">
                <Icon :icon="item.icon" class="h-4 w-4 text-[#5EDFFF]" />
                {{ item.period }}
              </div>
              <h3 class="mt-3 text-xl font-semibold text-white">{{ item.title }}</h3>
              <p class="text-sm font-semibold text-[#57F2CB]">{{ item.subtitle }}</p>
              <p class="mt-3 text-sm leading-relaxed text-white/60">{{ item.description }}</p>
              <ul class="mt-4 space-y-2 text-sm text-white/50">
                <li v-for="point in item.highlights" :key="point" class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5EDFFF]"></span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>

            <div class="relative z-10 md:order-2">
              <div class="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#020810] text-white">
                <div class="absolute inset-0 animate-ping rounded-full bg-[#5EDFFF]/10"></div>
                <div class="absolute inset-2 rounded-full bg-gradient-to-br from-[#5EDFFF] to-[#57F2CB] opacity-20 blur-xl"></div>
                <span class="relative font-semibold text-white/80">{{ item.year }}</span>
              </div>
            </div>

            <div class="md:order-3" :class="{ 'md:order-1': index % 2 !== 0, 'md:order-3': index % 2 === 0 }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const timeline = [
    {
    year: '2025',
    period: 'INPTIC',
    title: 'Licence Professionnelle',
    subtitle: 'Webmastering & Communication digitale',
    description: 'Approfondissement des architectures web, SEO avancé et pilotage de projets orientés performance.',
    highlights: [
      'Projets de refonte UX/UI complets',
      'Suivi marketing & SEO multi-supports',
      'Gestion d’équipe projet et livrables'
    ],
    icon: 'mdi:certificate-outline'
  },
  {
    year: '2025',
    period: 'Startup Studio',
    title: 'Lead Frontend',
    subtitle: 'Plateformes SaaS & outils internes',
    description: 'Construction de dashboards temps réel, intégration Firebase Admin et pipelines CI/CD.',
    highlights: [
      'Optimisations Lighthouse > 90',
      'Création de composants UI réutilisables',
      'Workflows d’authentification avancés'
    ],
    icon: 'mdi:view-dashboard-outline'
  },
  {
    year: '2024',
    period: 'INPTIC',
    title: 'Diplôme de Technicien Supérieur',
    subtitle: 'Développement web & mobile',
    description: 'Spécialisation front-end / mobile avec intégration Firebase, tests et industrialisation.',
    highlights: [
      'Applications multi-écrans responsive',
      'Gestion de bases MySQL & Firebase',
      'Projets académiques livrés en équipe'
    ],
    icon: 'mdi:laptop'
  },
  {
    year: '2020',
    period: 'Lycée National Léon MBA',
    title: 'Baccalauréat',
    subtitle: 'Série scientifique',
    description: 'Formation pluridisciplinaire qui a posé les bases logiques et analytiques de mon parcours tech.',
    highlights: [
      'Culture scientifique solide',
      'Engagement associatif et leadership',
      'Curiosité pour les technologies émergentes'
    ],
    icon: 'mdi:school-outline'
  }
];
</script>

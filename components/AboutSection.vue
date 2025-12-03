<template>
  <section class="relative py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-16 items-center lg:grid-cols-2">
        <!-- Image Side -->
        <div class="relative">
          <div class="relative mx-auto max-w-md">
            <div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#5EDFFF]/20 to-[#57F2CB]/20 blur-2xl"></div>
            <div class="relative rounded-2xl border border-white/10 bg-white/5 p-3">
              <NuxtImg src="/stevy.png" alt="Stevy OBAME" class="w-full rounded-xl" />
            </div>
          </div>
        </div>

        <!-- Content Side -->
        <div class="space-y-8">
          <div>
            <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5EDFFF]/20 bg-[#5EDFFF]/5 px-4 py-2">
              <span class="h-2 w-2 rounded-full bg-[#57F2CB] animate-pulse"></span>
              <span class="font-mono text-sm text-[#5EDFFF]">about.me()</span>
            </div>
            <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">
              À <span class="text-[#5EDFFF]">Propos</span>
            </h1>
          </div>

          <div class="space-y-4 leading-relaxed text-white/60">
            <p>
              Passionné par le développement web depuis plusieurs années, je me spécialise dans la création
              d'applications modernes et performantes avec Vue.js et l'écosystème Nuxt.
            </p>
            <p>
              Mon approche combine créativité et rigueur technique pour livrer des solutions qui
              répondent aux besoins réels des utilisateurs tout en offrant une expérience exceptionnelle.
            </p>
            <p>
              Ma polyvalence s’étend également au design graphique (Illustrator, Figma, Canva)
              et au montage vidéo (Premiere Pro, CapCut Pro), me permettant d’apporter une cohérence
              visuelle et UX aux projets que je développe.
            </p>
            <p>
              Basé à Libreville, au Gabon, j’aime apprendre, explorer les nouvelles technologies, et
              collaborer sur des projets innovants, localement ou à l’international.
            </p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
            <div>
              <div class="text-3xl font-bold text-[#5EDFFF]">3+</div>
              <div class="text-sm text-white/50">Années d'expérience</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-[#5EDFFF]">20+</div>
              <div class="text-sm text-white/50">Projets réalisés</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-[#5EDFFF]">100%</div>
              <div class="text-sm text-white/50">Satisfaction client</div>
            </div>
          </div>

          <!-- CTA -->
          <div class="flex gap-4">
            <NuxtLink
              to="/contact"
              class="rounded-xl bg-gradient-to-r from-[#5EDFFF] to-[#57F2CB] px-6 py-3 font-semibold text-[#020810] transition-opacity hover:opacity-90"
            >
              Me contacter
            </NuxtLink>
            <a
              href="/Cv_Stevy.pdf"
              target="_blank"
              class="rounded-xl border border-white/20 px-6 py-3 text-white transition-colors hover:border-[#5EDFFF]/50"
            >
              Télécharger CV
            </a>
          </div>
        </div>
      </div>

      <!-- Interests -->
      <div class="interests-panel">
        <div class="mb-6 flex items-center gap-2">
          <span class="h-2 w-2 animate-pulse rounded-full bg-[#57F2CB]"></span>
          <p class="text-sm uppercase tracking-[0.3em] text-white/40">Centres d'intérêt</p>
        </div>
        <div class="simple-interests">
          <div v-for="interest in interests" :key="interest.key" class="interest-tile">
            <div class="interest-icon">
              <Icon :icon="interest.icon" class="w-6 h-6" />
            </div>
            <div>
              <p class="interest-title">{{ interest.title }}</p>
              <p class="interest-desc">{{ interest.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Interest = {
  key: string;
  title: string;
  description: string;
  icon: string;
};

const interests: Interest[] = [
  {
    key: 'football',
    title: 'Football & esprit d\'équipe',
    description: 'Collectif, stratégie et dépassement – les mêmes valeurs que j\'apporte dans mes projets.',
    icon: 'mdi:soccer'
  },
  {
    key: 'tech',
    title: 'Veille technologique & IA',
    description: 'Observer les tendances pour imaginer des expériences plus intelligentes et productives.',
    icon: 'mdi:cpu-64-bit'
  },
  {
    key: 'photo',
    title: 'Photographie & design visuel',
    description: 'Un regard graphique qui nourrit mes choix UI/UX et storytelling.',
    icon: 'mdi:camera-iris'
  },
  {
    key: 'cinema',
    title: 'Cinéma & séries',
    description: 'Inspirations narratives et sens du détail pour créer des interfaces expressives.',
    icon: 'mdi:movie-open-play'
  }
];
</script>

<style scoped>
.interests-panel {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(4, 8, 20, 0.6);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

.simple-interests {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.interest-tile {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.interest-tile:hover {
  border-color: rgba(94, 223, 255, 0.4);
  transform: translateY(-4px);
}

.interest-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(94, 223, 255, 0.12);
  color: #5edfff;
}

.interest-title {
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.interest-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
}
</style>

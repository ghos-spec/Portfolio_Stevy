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
        <div
          v-if="availableCategories.length || availableTags.length"
          class="mb-10 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-5 md:py-5"
        >
          <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">Filtres</p>
              <p class="text-xs text-white/60">Affinez les projets affichés par catégorie et technologies.</p>
            </div>
            <button
              v-if="selectedCategory || selectedTag"
              type="button"
              class="self-start rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-white/60 hover:text-white hover:border-[#5EDFFF]/40 hover:bg-[#5EDFFF]/10 transition-colors"
              @click="resetFilters"
            >
              Réinitialiser les filtres
            </button>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-xs font-semibold text-white/60">Catégorie</label>
              <select
                v-model="selectedCategory"
                class="w-full rounded-xl border border-white/10 bg-[#020816] px-3 py-2 text-sm text-white/80 focus:border-[#5EDFFF] focus:outline-none"
              >
                <option value="">Toutes les catégories</option>
                <option
                  v-for="category in availableCategories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-xs font-semibold text-white/60">Technologies / Tags</label>
              <select
                v-model="selectedTag"
                class="w-full rounded-xl border border-white/10 bg-[#020816] px-3 py-2 text-sm text-white/80 focus:border-[#57F2CB] focus:outline-none"
              >
                <option value="">Tous les tags</option>
                <option
                  v-for="tag in availableTags"
                  :key="tag"
                  :value="tag"
                >
                  {{ tag }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Placeholder for projects -->
        <div v-if="isLoading" class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
          Chargement des projets...
        </div>
        <div v-else-if="displayError" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 max-w-xl mx-auto">
          {{ displayError }}
        </div>
        <div v-else-if="!visibleProjects.length" class="text-center text-sm text-white/50">
          Aucun projet publié pour le moment. Revenez bientôt pour découvrir de nouvelles réalisations.
        </div>
        <div v-else class="grid md:grid-cols-2 gap-8">
          <ProjectCard
            v-for="project in visibleProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </section>
    <FuturisticFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import FuturisticFooter from '~/components/FuturisticFooter.vue';
import ProjectCard from '~/components/projects/ProjectCard.vue';
import { useProjectsData, mapProjectsResponse } from '~/composables/useProjectsData';

useHead({
  title: 'Projets | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)',
  meta: [
    {
      name: 'description',
      content:
        "Découvrez les projets web, identités visuelles et créations graphiques réalisés par Stevy OBAME, freelance à Libreville (Gabon), pour des clients au Gabon et à l'international."
    },
    {
      property: 'og:title',
      content: 'Projets | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      property: 'og:description',
      content:
        "Découvrez les projets web, identités visuelles et créations graphiques réalisés par Stevy OBAME, freelance à Libreville (Gabon), pour des clients au Gabon et à l'international."
    },
    {
      property: 'og:image',
      content: '/projet.png'
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
      content: 'Projets | Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)'
    },
    {
      name: 'twitter:description',
      content:
        "Découvrez les projets web, identités visuelles et créations graphiques réalisés par Stevy OBAME, freelance à Libreville (Gabon), pour des clients au Gabon et à l'international."
    },
    {
      name: 'twitter:image',
      content: '/projet.png'
    }
  ]
});

const {
  data: initialProjectsData,
  pending,
  error: asyncError
} = await useAsyncData('public-projects', () => $fetch<any[]>('/api/projects'));

const { projects, loading, error } = useProjectsData({
  initialProjects: mapProjectsResponse(initialProjectsData.value || []),
  autoFetch: false
});

const isLoading = computed(() => pending.value || loading.value);
const displayError = computed(() => error.value || asyncError.value?.message || '');

const PUBLIC_CATEGORY_OPTIONS = [
  'Développement Web',
  'Développement Mobile',
  'Webdesign',
  'Design Graphique',
  'Audiovisuel'
];

const selectedCategory = ref('');
const selectedTag = ref('');

const availableCategories = computed(() => PUBLIC_CATEGORY_OPTIONS);

const availableTags = computed(() => {
  const set = new Set<string>();
  for (const project of projects.value) {
    if (project.status !== 'Publié') continue;
    for (const tag of project.tags || []) {
      if (tag) {
        set.add(tag);
      }
    }
  }
  return Array.from(set).sort();
});

const resetFilters = () => {
  selectedCategory.value = '';
  selectedTag.value = '';
};

const visibleProjects = computed(() =>
  projects.value.filter((project) => {
    if (project.status !== 'Publié') return false;
    if (selectedCategory.value && project.category !== selectedCategory.value) return false;
    if (selectedTag.value && !project.tags.includes(selectedTag.value)) return false;
    return true;
  })
);
</script>

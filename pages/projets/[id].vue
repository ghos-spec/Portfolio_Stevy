<template>
  <div class="min-h-screen bg-[#020810]">
    <section class="relative py-24">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-8 flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Projet</p>
            <h1 class="text-3xl md:text-4xl font-bold text-white mt-2" v-if="project">
              {{ project.name }}
            </h1>
          </div>
          <NuxtLink
            to="/projets"
            class="text-xs text-white/60 hover:text-[#5EDFFF] inline-flex items-center gap-2"
          >
            <span class="text-lg">←</span>
            <span>Retour aux projets</span>
          </NuxtLink>
        </div>

        <div v-if="pending" class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
          Chargement du projet...
        </div>

        <div
          v-else-if="error || !project"
          class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          Ce projet est introuvable ou n'est plus disponible.
        </div>

        <div v-else class="grid gap-8 md:grid-cols-2 items-start">
          <div class="space-y-4">
            <div v-if="project.videoUrl" class="aspect-video overflow-hidden rounded-2xl bg-black/40">
              <video :src="project.videoUrl" controls class="h-full w-full object-cover" />
            </div>
            <div v-else-if="project.imageUrl" class="aspect-video overflow-hidden rounded-2xl bg-black/40">
              <img
                :src="project.imageUrl"
                :alt="`Visuel du projet ${project.name}`"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div
              v-else
              class="flex aspect-video items-center justify-center rounded-2xl bg-white/5 text-4xl font-semibold text-white/30"
            >
              {{ project.initials }}
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <span class="rounded-full bg-white/5 px-3 py-1 font-medium text-white/70">
                {{ project.category || 'Développement Web' }}
              </span>
              <span
                class="rounded-full px-3 py-1 font-semibold"
                :class="project.status === 'Publié' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-200'"
              >
                {{ project.status }}
              </span>
              <span v-if="project.date" class="text-white/50">
                {{ project.date }}
              </span>
            </div>

            <p class="text-sm text-white/75 leading-relaxed">
              {{ project.description }}
            </p>

            <div v-if="project.tags?.length" class="flex flex-wrap gap-2 pt-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex flex-wrap gap-3 pt-4">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-full bg-[#5EDFFF] px-4 py-2 text-xs font-semibold text-[#020810] hover:bg-[#57F2CB] transition-colors"
              >
                Visiter le projet en ligne →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FuturisticFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FuturisticFooter from '~/components/FuturisticFooter.vue';
import { mapProjectsResponse, type ProjectRecord } from '~/composables/useProjectsData';

const route = useRoute();
const projectId = route.params.id as string;

const { data, pending, error } = await useAsyncData<ProjectRecord | null>(
  `public-project-${projectId}`,
  async () => {
    const response = await $fetch<any[]>('/api/projects');
    const projects = mapProjectsResponse(response);
    const found = projects.find((project) => project.id === projectId && project.status === 'Publié');
    return found ?? null;
  }
);

const project = computed(() => data.value);

useHead(() => {
  const baseTitle =
    'Stevy OBAME - Développeur web & designer graphique freelance à Libreville (Gabon)';
  const name = project.value?.name ?? 'Projet de Stevy OBAME';
  const rawDescription =
    project.value?.description ||
    "Découvrez un projet réalisé par Stevy OBAME, développeur web & designer graphique freelance basé à Libreville (Gabon).";
  const description = rawDescription.length > 180 ? `${rawDescription.slice(0, 177)}...` : rawDescription;
  const image = project.value?.imageUrl || '';

  const url = useRequestURL();
  const canonical = new URL(`/projets/${projectId}`, url.origin);

  const meta: Record<string, string>[] = [
    { name: 'description', content: description },
    { property: 'og:title', content: `${name} | ${baseTitle}` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonical.href },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${name} | ${baseTitle}` },
    { name: 'twitter:description', content: description }
  ];

  if (image) {
    meta.push({ property: 'og:image', content: image });
    meta.push({ name: 'twitter:image', content: image });
  }

  return {
    title: `${name} | ${baseTitle}`,
    meta,
    link: [
      {
        rel: 'canonical',
        href: canonical.href
      }
    ]
  };
});
</script>

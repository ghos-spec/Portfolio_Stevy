<template>
  <article class="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#5EDFFF]/40 hover:shadow-[0_0_40px_rgba(94,223,255,0.25)] transition-all duration-300">
    <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-[#5EDFFF]/20 to-[#57F2CB]/10">
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="`Visuel du projet ${project.name}`"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#020810] via-black/20 to-transparent"></div>
      <div class="absolute left-4 top-4 flex items-center gap-2">
        <span class="rounded-full bg-black/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/70">
          {{ project.category || 'Développement Web' }}
        </span>
        <span
          class="rounded-full px-3 py-1 text-xs font-semibold"
          :class="project.status === 'Publié' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-200'"
        >
          {{ project.status }}
        </span>
      </div>
      <div v-if="!project.imageUrl" class="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-white/40">
        {{ project.initials }}
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-[#5EDFFF] transition-colors">
        {{ project.name }}
      </h3>
      <p class="text-sm text-white/60 mb-4 project-card-description-snippet">
        {{ project.description }}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-3 py-1 text-xs rounded-full bg-[#5EDFFF]/10 text-[#5EDFFF] border border-[#5EDFFF]/20"
        >
          {{ tag }}
        </span>
      </div>
      <div class="flex items-center justify-between text-xs text-white/40">
        <span v-if="project.date">
          {{ project.date }}
        </span>
        <div class="flex items-center gap-2">
          <span class="hidden sm:inline text-[11px] text-white/55">Explorer le projet&nbsp;:</span>
          <NuxtLink
            :to="`/projets/${project.id}`"
            class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 hover:text-white hover:border-[#5EDFFF]/40 hover:bg-[#5EDFFF]/10 transition-colors"
          >
            {{ 
              project.category === 'Design Graphique'
                ? 'En savoir plus →'
                : project.category === 'Audiovisuel'
                  ? 'Voir la vidéo →'
                  : 'En savoir plus →'
            }}
          </NuxtLink>
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full bg-[#5EDFFF] px-3 py-1 text-[11px] font-semibold text-[#020810] hover:bg-[#57F2CB] transition-colors"
          >
            {{
              project.category === 'Design Graphique'
                ? 'Voir la galerie →'
                : project.category === 'Audiovisuel'
                  ? 'Regarder la vidéo →'
                  : 'Découvrir le projet →'
            }}
          </a>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showDetails"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
        >
          <div class="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#020810] text-white shadow-2xl">
            <button
              type="button"
              class="absolute right-4 top-4 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              @click="showDetails = false"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5">
                <path
                  d="m6 6 12 12M18 6 6 18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <div class="space-y-4 border-b border-white/5 px-6 pb-4 pt-5">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                  {{ project.category || 'Développement Web' }}
                </span>
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="project.status === 'Publié' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-200'"
                >
                  {{ project.status }}
                </span>
                <span v-if="project.date" class="text-xs text-white/50">
                  {{ project.date }}
                </span>
              </div>
              <h3 class="text-2xl font-semibold leading-snug">
                {{ project.name }}
              </h3>
            </div>

            <div class="grid gap-6 px-6 py-5 md:grid-cols-2">
              <div class="space-y-3">
                <div v-if="project.videoUrl" class="aspect-video overflow-hidden rounded-2xl bg-black/40">
                  <video
                    :src="project.videoUrl"
                    controls
                    class="h-full w-full object-cover"
                  />
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

              <div class="flex flex-col justify-between gap-4">
                <div class="space-y-3">
                  <p class="text-sm text-white/70">
                    {{ project.description }}
                  </p>
                  <div v-if="project.tags?.length" class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in project.tags"
                      :key="tag"
                      class="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-3 pt-2">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-full bg-[#5EDFFF] px-4 py-2 text-xs font-semibold text-[#020810] hover:bg-[#57F2CB] transition-colors"
                  >
                    {{
                      project.category === 'Design Graphique'
                        ? 'Voir la galerie →'
                        : project.category === 'Audiovisuel'
                          ? 'Regarder la vidéo →'
                          : 'Découvrir le projet →'
                    }}
                  </a>
                  <button
                    type="button"
                    class="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70 hover:border-white/40 hover:text-white transition-colors"
                    @click="showDetails = false"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ProjectRecord } from '~/composables/useProjectsData';

defineProps<{
  project: ProjectRecord;
}>();

const showDetails = ref(false);
</script>

<style scoped>
.project-card-description-snippet {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>

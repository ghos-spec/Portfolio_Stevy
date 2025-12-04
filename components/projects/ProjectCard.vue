<template>
  <article class="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#5EDFFF]/40 hover:shadow-[0_0_40px_rgba(94,223,255,0.25)] transition-all duration-300">
    <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-[#5EDFFF]/20 to-[#57F2CB]/10">
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="`Visuel du projet ${project.name}`"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
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
      <p class="text-sm text-white/60 mb-4">
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
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 hover:text-white hover:border-[#5EDFFF]/40 hover:bg-[#5EDFFF]/10 transition-colors"
          >
            Voir le code →
          </a>
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full bg-[#5EDFFF] px-3 py-1 text-[11px] font-semibold text-[#020810] hover:bg-[#57F2CB] transition-colors"
          >
            Visiter le site →
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProjectRecord } from '~/composables/useProjectsData';

defineProps<{
  project: ProjectRecord;
}>();
</script>

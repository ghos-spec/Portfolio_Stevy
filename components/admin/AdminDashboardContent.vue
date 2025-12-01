<template>
  <section class="space-y-8">
    <div v-if="error" class="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-4 text-center text-rose-300">
      {{ error }}
    </div>

    <div class="relative">
      <div v-if="loading" class="absolute inset-0 z-10 flex items-center justify-center rounded-3xl border border-white/5 bg-[#0B1527]/90 text-white/70">
        Chargement des données...
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="card in statCards"
          :key="card.label"
          class="rounded-3xl border border-white/5 bg-gradient-to-b from-[#101f37] to-[#0d1627] px-6 py-5 text-white shadow-lg shadow-black/20"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3 text-white/70">
              <span :class="['flex h-12 w-12 items-center justify-center rounded-2xl', card.bg]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-6 w-6">
                  <path
                    v-for="(path, idx) in card.icon"
                    :key="idx"
                    :d="path"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p class="text-sm text-white/60">{{ card.label }}</p>
                <p class="text-3xl font-semibold">{{ card.value }}</p>
              </div>
            </div>
            <p :class="card.delta.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'">{{ card.delta }}</p>
          </div>
        </article>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-3">
      <div class="space-y-6 rounded-3xl border border-white/5 bg-[#0B1527] p-6 text-white shadow-lg shadow-black/20 xl:col-span-2">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Activité récente</h2>
          <button type="button" class="text-sm font-semibold text-cyan-400 hover:text-cyan-300">Tout voir</button>
        </div>
        <ul class="space-y-4">
          <li v-for="activity in activities" :key="activity.title" class="flex items-start gap-4 rounded-2xl bg-white/5 px-4 py-3">
            <span :class="['flex h-10 w-10 items-center justify-center rounded-xl text-white', activity.bg]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
                <path
                  v-for="(path, idx) in activity.icon"
                  :key="idx"
                  :d="path"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div>
              <p class="font-medium">{{ activity.title }}</p>
              <p class="text-sm text-white/60">{{ activity.time }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 text-white shadow-lg shadow-black/20">
        <h2 class="text-xl font-semibold">Actions rapides</h2>
        <div class="mt-6 space-y-4">
          <button
            v-for="action in quickActions"
            :key="action.label"
            type="button"
            class="flex w-full items-center gap-4 rounded-2xl bg-white/5 px-4 py-3 text-left transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
            @click="() => handleQuickAction(action.label)"
          >
            <span :class="['flex h-10 w-10 items-center justify-center rounded-xl', action.bg]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
                <path
                  v-for="(path, idx) in action.icon"
                  :key="idx"
                  :d="path"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div>
              <p class="font-semibold">{{ action.label }}</p>
              <p class="text-sm text-white/60">{{ action.description }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useDashboardData } from '~/composables/useDashboardData';

const { loading, error, statCards, activities, quickActions, refresh } = useDashboardData();

const router = useRouter();

const handleQuickAction = (label) => {
  switch (label) {
    case 'Ajouter un projet':
    case 'Uploader des médias':
      router.push('/admin/projects');
      break;
    case 'Modifier le profil':
      router.push('/admin/profile');
      break;
    case 'Voir le portfolio':
      router.push('/');
      break;
    default:
      break;
  }
};
</script>

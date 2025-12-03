<template>
  <section class="relative mx-auto mt-24 w-full max-w-6xl px-6">
  <div class="rounded-[32px] border border-white/5 bg-gradient-to-br from-[#060d1f] to-[#040812] p-10 text-white shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
      <div class="mb-10 flex flex-col items-start gap-4 text-white/80 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.4em] text-white/50">Impaсt en chiffres</p>
          <h2 class="mt-3 text-3xl font-bold">Un parcours tourné vers la performance et la confiance.</h2>
        </div>
        <p class="max-w-xl text-sm text-white/60">
          Des projets livrés dans divers secteurs (FinTech, e-commerce, projets institutionnels) avec un focus constant sur la qualité
          d'expérience et les résultats mesurables.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition hover:border-[#5EDFFF]/60"
        >
          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5EDFFF]/20 to-[#57F2CB]/10">
            <Icon :icon="stat.icon" class="text-2xl" aria-hidden="true" />
          </div>
          <p class="text-4xl font-black text-[#5EDFFF]">{{ stat.value }}</p>
          <p class="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { label: 'Projects Completed', value: '50+', icon: 'mdi:code-braces' },
  { label: 'Years Experience', value: '3+', icon: 'mdi:briefcase' },
  { label: 'Cups of Coffee', value: '1000+', icon: 'mdi:coffee-outline' },
  { label: 'Happy Clients', value: '30+', icon: 'mdi:account-group' }
];
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-gradient-to-r from-[#0a192f]/95 via-[#020c1b]/90 to-[#0a192f]/95 border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-lg'
        : 'bg-gradient-to-r from-[#0a192f] via-[#020c1b] to-[#0a192f] border-b border-transparent'
    ]"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-white">
      <NuxtLink to="/" class="flex items-center">
        <NuxtImg src="/logo/Logo_blanc.svg" alt="Logo Stevy" class="h-10 w-auto" width="120" height="40" />
      </NuxtLink>

      <nav class="hidden items-center gap-10 text-sm font-medium text-white/70 lg:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="transition hover:text-white"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <NuxtLink
          to="/admin/login"
          class="hidden rounded-full border border-white/15 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white/70 transition hover:border-white/40 hover:text-white lg:inline-flex"
        >
          Admin
        </NuxtLink>
        <button
          type="button"
          class="hidden rounded-full bg-gradient-to-r from-[#63C1FF] to-[#57F2CB] px-5 py-2 text-sm font-semibold text-[#041028] shadow-lg shadow-[#63C1FF]/30 transition hover:shadow-[#63C1FF]/50 lg:inline-flex"
        >
          Hire Me
        </button>
        <div class="flex items-center gap-2 lg:hidden">
          <button type="button" class="rounded-full border border-white/20 px-3 py-2 text-xl" @click="() => toggleMenu()">
            ≡
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="border-t border-white/5 bg-[#020614] px-6 py-4 text-white lg:hidden">
        <nav class="flex flex-col gap-4 text-sm font-medium">
          <NuxtLink
            v-for="link in navLinks"
            :key="`mobile-${link.to}`"
            :to="link.to"
            class="rounded-md px-2 py-1 transition hover:bg-white/5"
            @click="toggleMenu(false)"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/admin/login"
            class="rounded-md px-2 py-2 text-center font-semibold text-white/80 hover:bg-white/5"
            @click="toggleMenu(false)"
          >
            Accès admin
          </NuxtLink>
          <button
            type="button"
            class="rounded-full bg-gradient-to-r from-[#63C1FF] to-[#57F2CB] px-4 py-2 text-sm font-semibold text-[#041028]"
          >
            Hire Me
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Skills', to: '#skills' },
  { label: 'Projects', to: '#projects' },
  { label: 'About', to: '#about' },
  { label: 'Contact', to: '#contact' }
];

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = (value?: boolean) => {
  if (typeof value === 'boolean') {
    isMenuOpen.value = value;
    return;
  }
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 20;
  }
};

onMounted(() => {
  handleScroll();
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

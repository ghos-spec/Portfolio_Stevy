<template>
  <transition name="loader-fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#020614]/90 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="relative flex items-center justify-center">
        <div class="loader-ring"></div>
        <img
          src="/logo/Stevylogooo.svg"
          alt="Chargement du portfolio de Stevy OBAME"
          class="loader-logo"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const isLoading = useState<boolean>('global-loading', () => true);
</script>

<style scoped>
.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.25s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}

.loader-ring {
  height: 6rem;
  width: 6rem;
  border-radius: 9999px;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(94, 223, 255, 0.25);
  border-top-color: rgba(94, 223, 255, 0.9);
  box-shadow: 0 0 25px rgba(94, 223, 255, 0.35);
  animation: loader-spin 1.4s linear infinite;
}

.loader-logo {
  position: absolute;
  height: 3.5rem;
  width: 3.5rem;
  object-fit: contain;
  filter: drop-shadow(0 0 16px rgba(94, 223, 255, 0.55));
  animation: loader-pulse 1.6s ease-in-out infinite;
}

@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.95;
  }
  50% {
    transform: scale(1.04);
    opacity: 1;
  }
}
</style>

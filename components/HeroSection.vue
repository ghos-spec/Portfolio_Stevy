<template>
  <div
    class="relative overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#020c1b] to-[#0a192f]"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
  >
    <section
      id="hero"
      class="mx-auto flex min-h-[90vh] w-full max-w-6xl flex-col gap-16 px-6 py-16 text-white lg:flex-row lg:items-center"
    >
      <div class="flex-1 space-y-8 relative">
        <div class="pulsing-halo pulsing-halo--text"></div>
        <div class="text-sm uppercase tracking-[0.4em] text-white/50 hero-animate">Développeur Full-Stack</div>
        <div class="space-y-6">
          <p class="font-display text-5xl font-bold leading-[1.05] text-white hero-animate hero-delay-1 sm:text-6xl">
            Bonjour, je suis <span class="text-[#5EDFFF]">Stevy</span><br />OBAME
          </p>
          <p class="max-w-xl text-lg text-white/70 hero-animate hero-delay-2">
            Je conçois des expériences modernes et évolutives avec un code propre, des interfaces expressives et un storytelling
            immersif. J'allie développement web/mobile, design et vidéo pour transformer les idées en produits élégants et
            performants.
          </p>
        </div>

        <div class="flex flex-wrap gap-4 hero-animate hero-delay-3">
          <NuxtLink
            to="#projects"
            class="inline-flex items-center justify-center rounded-full bg-[#5EDFFF] px-6 py-3 text-sm font-semibold text-[#041028] shadow-lg shadow-[#5EDFFF]/40 transition hover:shadow-[#5EDFFF]/60"
          >
            Voir mes projets
          </NuxtLink>
          <NuxtLink
            to="#contact"
            class="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Me contacter
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4 text-white/70 hero-animate hero-delay-4">
          <span class="text-sm uppercase tracking-[0.4em]"><span class="text-white/40">Réseaux</span> Sociaux</span>
          <div class="flex gap-3">
            <a
              href="https://github.com/ghos-spec"
              target="_blank"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/40 hover:text-[#5EDFFF]"
            >
              <Icon icon="mdi:github" class="text-xl" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/40 hover:text-[#5EDFFF]"
            >
              <Icon icon="mdi:linkedin" class="text-xl" aria-hidden="true" />
            </a>
            <a
              href="mailto:stevyobame163@gmail.com"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/40 hover:text-[#5EDFFF]"
            >
              <Icon icon="mdi:email-outline" class="text-xl" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div class="flex-1 relative">
        <div class="pulsing-halo pulsing-halo--image"></div>
        <div
          class="relative mx-auto max-w-md rounded-[32px] bg-gradient-to-br from-white/5 to-white/0 p-6 transition-transform duration-300"
          :style="{ transform: imageTilt }"
        >
          <div class="absolute -left-6 top-8 rounded-full bg-[#5EDFFF]/10 px-4 py-1 text-xs font-semibold uppercase text-[#5EDFFF] backdrop-blur shadow-lg shadow-[#5EDFFF]/20 z-20 floating-badge">
            JS
          </div>
          <div class="absolute -right-3 top-4 rounded-full bg-white/10 p-3 text-[#5EDFFF] backdrop-blur shadow-lg shadow-black/30 z-20 floating-badge floating-delay-1">
            &lt;/&gt;
          </div>
          <div class="absolute -bottom-6 right-10 rounded-full bg-white/5 px-4 py-1 text-xs font-semibold uppercase text-white/70 shadow-lg shadow-black/30 z-20 floating-badge floating-delay-2">
            Nuxt · Firebase
          </div>

          <div class="relative overflow-hidden rounded-[28px] bg-[#080F1F] p-4 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
            <NuxtImg src="/stevy.png" alt="Stevy" class="relative z-10 rounded-[24px] object-cover" width="600" height="800" />
          </div>
        </div>
      </div>
    </section>

    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute left-1/2 top-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#0C1F3A] opacity-50 blur-[160px] pulse-glow"></div>
      <div class="absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-[#5EDFFF]/20 blur-[120px] pulse-glow delay-[1.5s]"></div>
      <div class="absolute -right-10 top-20 h-64 w-64 rounded-full bg-[#57F2CB]/20 blur-[120px] pulse-glow delay-[2.5s]"></div>
      <div class="absolute inset-0 animate-orbit opacity-40">
        <div class="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"></div>
      </div>
      <div class="absolute inset-0 mix-blend-screen">
        <span
          v-for="(particle, index) in particles"
          :key="`particle-${index}`"
          class="particle-dot"
          :style="{
            top: particle.top,
            left: particle.left,
            animationDelay: particle.delay,
            width: particle.size,
            height: particle.size
          }"
        ></span>
        <div class="orbit-arc orbit-arc--one"></div>
        <div class="orbit-arc orbit-arc--two"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const tilt = ref({ x: 0, y: 0 });
const particles = [
  { top: '12%', left: '15%', delay: '0s', size: '10px' },
  { top: '30%', left: '80%', delay: '1s', size: '6px' },
  { top: '65%', left: '20%', delay: '2s', size: '8px' },
  { top: '78%', left: '70%', delay: '2.5s', size: '5px' },
  { top: '45%', left: '50%', delay: '1.5s', size: '7px' },
  { top: '20%', left: '60%', delay: '0.5s', size: '9px' }
];

const handleMouseMove = (event: MouseEvent) => {
  const { currentTarget, clientX, clientY } = event;
  if (!(currentTarget instanceof HTMLElement)) return;

  const rect = currentTarget.getBoundingClientRect();
  const offsetX = clientX - (rect.left + rect.width / 2);
  const offsetY = clientY - (rect.top + rect.height / 2);
  tilt.value = {
    x: (offsetX / rect.width) * 10,
    y: (-offsetY / rect.height) * 10
  };
};

const resetTilt = () => {
  tilt.value = { x: 0, y: 0 };
};

const imageTilt = computed(() => `rotateX(${tilt.value.y}deg) rotateY(${tilt.value.x}deg)`);
</script>

<style scoped>
.hero-animate {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.7s forwards ease-out;
}

.hero-delay-1 {
  animation-delay: 0.1s;
}

.hero-delay-2 {
  animation-delay: 0.2s;
}

.hero-delay-3 {
  animation-delay: 0.3s;
}

.hero-delay-4 {
  animation-delay: 0.4s;
}

.floating-badge {
  animation: float 6s ease-in-out infinite;
}

.floating-delay-1 {
  animation-delay: 1s;
}

.floating-delay-2 {
  animation-delay: 2s;
}

.pulse-glow {
  animation: pulseGlow 8s ease-in-out infinite;
}

.animate-orbit {
  animation: orbit 20s linear infinite;
}

.particle-dot {
  position: absolute;
  border-radius: 999px;
  background: radial-gradient(circle, #8df7ff 0%, rgba(141, 247, 255, 0) 70%);
  box-shadow: 0 0 20px rgba(141, 247, 255, 0.5);
  animation: twinkle 5s ease-in-out infinite;
}

.orbit-arc {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  mix-blend-mode: screen;
  animation: orbit 30s linear infinite;
}

.orbit-arc--one {
  transform: scale(0.85);
}

.orbit-arc--two {
  transform: scale(1.2);
  animation-duration: 45s;
}

.pulsing-halo {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(87, 242, 203, 0.35) 0%, rgba(87, 242, 203, 0) 70%);
  filter: blur(40px);
  opacity: 0.4;
  animation: pulseHalo 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

.pulsing-halo--text {
  width: 80%;
  height: 80%;
  transform: translate(-10%, -15%);
}

.pulsing-halo--image {
  width: 100%;
  height: 100%;
  transform: translate(0, -5%);
  animation-delay: 1.2s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes pulseGlow {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.55;
  }
}

@keyframes orbit {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes pulseHalo {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.55;
    transform: scale(1.05);
  }
}
</style>

<template>
  <section class="relative py-24 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#020810] via-[#040d1a] to-[#020810]"></div>
    
    <!-- Animated Grid -->
    <div class="section-grid"></div>
    
    <!-- Floating Particles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="i"
        class="particle"
        :style="{ left: p.x, top: p.y, animationDelay: p.delay }"
      ></span>
    </div>

    <!-- Glowing Orbs -->
    <div class="absolute -left-40 top-1/2 w-80 h-80 bg-[#5EDFFF]/10 rounded-full blur-[120px] animate-pulse-slow"></div>
    <div class="absolute -right-40 top-1/4 w-60 h-60 bg-[#57F2CB]/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <div class="inline-flex items-center gap-3 mb-6">
          <span class="w-12 h-px bg-gradient-to-r from-transparent to-[#5EDFFF]"></span>
          <span class="section-tag">Impact en chiffres</span>
          <span class="w-12 h-px bg-gradient-to-l from-transparent to-[#5EDFFF]"></span>
        </div>
        <h2 class="section-title">
          Un parcours tourné vers la <span class="text-gradient">performance</span>
        </h2>
        <p class="mt-4 max-w-2xl mx-auto text-white/50 text-lg">
          Des projets livrés dans divers secteurs avec un focus constant sur la qualité d'expérience et les résultats mesurables.
        </p>
      </div>

      <!-- Stats Grid with Hologram Effect -->
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 perspective-container">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          :ref="el => setCardRef(el, index)"
          class="stat-card-wrapper"
          :class="{ 'is-active': activeCard === index }"
          :style="{ animationDelay: `${index * 150}ms` }"
          @mouseenter="activateCard(index)"
          @mouseleave="deactivateCard()"
        >
          <!-- Base Card -->
          <div class="stat-card group">
            <!-- Card Glow -->
            <div class="card-glow"></div>
            
            <!-- Scan Line -->
            <div class="card-scan-line"></div>
            
            <!-- Circuit Corner -->
            <svg class="circuit-corner" viewBox="0 0 40 40">
              <path d="M0 40 L0 20 L20 0 L40 0" fill="none" stroke="currentColor" stroke-width="1"/>
              <circle cx="20" cy="0" r="2" fill="currentColor"/>
            </svg>

            <!-- Icon Container -->
            <div class="icon-container">
              <div class="icon-ring"></div>
              <div class="icon-glow"></div>
              <Icon :icon="stat.icon" class="relative z-10 text-2xl text-[#5EDFFF]" aria-hidden="true" />
            </div>

            <!-- Value with Counter Effect -->
            <div class="stat-value-wrapper">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-value-glow">{{ stat.value }}</span>
            </div>

            <!-- Label -->
            <p class="stat-label">{{ stat.label }}</p>

            <!-- Bottom Bar -->
            <div class="stat-bar">
              <div class="stat-bar-fill"></div>
            </div>
          </div>

          <!-- Hologram Projection -->
          <div class="hologram-container">
            <div class="hologram-projection">
              <!-- Hologram Lines -->
              <div class="hologram-lines">
                <span v-for="n in 8" :key="n" class="holo-line" :style="{ animationDelay: `${n * 0.1}s` }"></span>
              </div>
              
              <!-- Hologram Content -->
              <div class="hologram-content">
                <div class="holo-icon">
                  <Icon :icon="stat.icon" class="text-4xl" aria-hidden="true" />
                </div>
                <div class="holo-value">{{ stat.value }}</div>
                <div class="holo-label">{{ stat.label }}</div>
                <div class="holo-detail">{{ stat.detail || 'Performance mesurable' }}</div>
              </div>

              <!-- Hologram Base Ring -->
              <div class="hologram-base">
                <svg viewBox="0 0 200 60" class="w-full">
                  <ellipse cx="100" cy="30" rx="90" ry="25" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
                  <ellipse cx="100" cy="30" rx="70" ry="18" fill="none" stroke="currentColor" stroke-width="0.5"/>
                </svg>
              </div>

              <!-- Hologram Glow -->
              <div class="hologram-glow"></div>
              
              <!-- Data Streams -->
              <div class="data-streams">
                <span v-for="n in 4" :key="`stream-${n}`" class="data-stream" :style="{ left: `${15 + n * 20}%`, animationDelay: `${n * 0.2}s` }"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Decoration -->
      <div class="mt-16 flex items-center justify-center gap-4">
        <div class="w-20 h-px bg-gradient-to-r from-transparent to-[#5EDFFF]/50"></div>
        <div class="flex gap-2">
          <span class="w-2 h-2 rounded-full bg-[#5EDFFF]/30"></span>
          <span class="w-2 h-2 rounded-full bg-[#5EDFFF] glow-dot"></span>
          <span class="w-2 h-2 rounded-full bg-[#5EDFFF]/30"></span>
        </div>
        <div class="w-20 h-px bg-gradient-to-l from-transparent to-[#5EDFFF]/50"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const activeCard = ref<number | null>(null);
const cardRefs = ref<(Element | null)[]>([]);
const isMobile = ref(false);
let observer: IntersectionObserver | null = null;

const particles = Array.from({ length: 15 }, () => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`
}));

const stats = [
  { label: 'Projets Livrés', value: '50+', icon: 'mdi:code-braces', detail: 'Apps web & mobile livrées' },
  { label: 'Ans d\'Expérience', value: '3+', icon: 'mdi:briefcase', detail: 'Expertise en développement' },
  { label: 'Lignes de Code', value: '100K+', icon: 'mdi:console', detail: 'Code propre et maintenable' },
  { label: 'Clients Satisfaits', value: '30+', icon: 'mdi:account-group', detail: 'Collaborations réussies' }
];

const setCardRef = (el: Element | null, index: number) => {
  if (el) cardRefs.value[index] = el;
};

const activateCard = (index: number) => {
  if (!isMobile.value) {
    activeCard.value = index;
  }
};

const deactivateCard = () => {
  if (!isMobile.value) {
    activeCard.value = null;
  }
};

const setupIntersectionObserver = () => {
  if (!import.meta.client) return;
  
  isMobile.value = window.innerWidth < 1024;
  
  if (isMobile.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.value.findIndex(ref => ref === entry.target);
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            activeCard.value = index;
          }
        });
      },
      { threshold: [0.5, 0.7, 1.0], rootMargin: '-20% 0px -20% 0px' }
    );

    cardRefs.value.forEach((card) => {
      if (card) observer?.observe(card);
    });
  }
};

const handleResize = () => {
  const wasMobile = isMobile.value;
  isMobile.value = window.innerWidth < 1024;
  
  if (wasMobile !== isMobile.value) {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (isMobile.value) {
      setupIntersectionObserver();
    } else {
      activeCard.value = null;
    }
  }
};

onMounted(() => {
  if (import.meta.client) {
    setTimeout(setupIntersectionObserver, 100);
    window.addEventListener('resize', handleResize, { passive: true });
  }
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style scoped>
/* Grid Background */
.section-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(94, 223, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 223, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
}

/* Particles */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #5EDFFF 0%, transparent 70%);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite, twinkle 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-30px) translateX(15px); }
  50% { transform: translateY(-15px) translateX(-15px); }
  75% { transform: translateY(-40px) translateX(10px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
}

/* Animations */
.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.delay-1000 { animation-delay: 1s; }

/* Section Tag */
.section-tag {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #5EDFFF;
}

/* Section Title */
.section-title {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .section-title {
    font-size: 3rem;
  }
}

.text-gradient {
  background: linear-gradient(135deg, #5EDFFF, #57F2CB);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Stat Card */
.stat-card {
  position: relative;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s ease;
}

@keyframes cardFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Card Glow */
.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(94, 223, 255, 0.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-card:hover .card-glow {
  opacity: 1;
}

/* Card Scan Line */
.card-scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #5EDFFF, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .card-scan-line {
  opacity: 0.5;
  animation: cardScan 2s ease-in-out infinite;
}

@keyframes cardScan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Circuit Corner */
.circuit-corner {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  color: rgba(94, 223, 255, 0.2);
  transition: color 0.3s ease;
}

.stat-card:hover .circuit-corner {
  color: rgba(94, 223, 255, 0.5);
}

/* Icon Container */
.icon-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
}

.icon-ring {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(94, 223, 255, 0.2);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover .icon-ring {
  border-color: rgba(94, 223, 255, 0.4);
  transform: rotate(45deg) scale(1.1);
}

.icon-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(94, 223, 255, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .icon-glow {
  opacity: 1;
}

/* Stat Value */
.stat-value-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #5EDFFF;
  position: relative;
  z-index: 1;
}

.stat-value-glow {
  position: absolute;
  inset: 0;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #5EDFFF;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-value-glow {
  opacity: 0.5;
}

/* Stat Label */
.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.stat-card:hover .stat-label {
  color: rgba(255, 255, 255, 0.7);
}

/* Stat Bar */
.stat-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #5EDFFF, #57F2CB);
  transition: width 0.6s ease;
}

.stat-card:hover .stat-bar-fill {
  width: 100%;
}

/* Glow Dot */
.glow-dot {
  box-shadow: 0 0 10px #5EDFFF, 0 0 20px #5EDFFF;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 10px #5EDFFF; }
  50% { box-shadow: 0 0 20px #5EDFFF, 0 0 30px #5EDFFF; }
}

/* ============================================
   HOLOGRAM EFFECT STYLES
   ============================================ */

.perspective-container {
  perspective: 1200px;
}

.stat-card-wrapper {
  position: relative;
  animation: cardFadeIn 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

/* Hologram Container */
.hologram-container {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 200px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.5s ease;
  transform-origin: bottom center;
  z-index: 50;
}

.stat-card-wrapper.is-active .hologram-container {
  opacity: 1;
}

/* Hologram Projection */
.hologram-projection {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotateX(10deg);
  transform-style: preserve-3d;
}

/* Hologram Lines (scan effect) */
.hologram-lines {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 12px;
}

.holo-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(94, 223, 255, 0.3), transparent);
  animation: holoScan 2s ease-in-out infinite;
}

.holo-line:nth-child(1) { top: 10%; }
.holo-line:nth-child(2) { top: 25%; }
.holo-line:nth-child(3) { top: 40%; }
.holo-line:nth-child(4) { top: 55%; }
.holo-line:nth-child(5) { top: 70%; }
.holo-line:nth-child(6) { top: 85%; }
.holo-line:nth-child(7) { top: 95%; }
.holo-line:nth-child(8) { top: 5%; }

@keyframes holoScan {
  0%, 100% { opacity: 0.2; transform: scaleX(0.8); }
  50% { opacity: 0.6; transform: scaleX(1); }
}

/* Hologram Content */
.hologram-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 160px;
  padding: 1rem;
  background: linear-gradient(180deg, 
    rgba(94, 223, 255, 0.05) 0%, 
    rgba(94, 223, 255, 0.15) 50%, 
    rgba(94, 223, 255, 0.05) 100%);
  border: 1px solid rgba(94, 223, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: holoFlicker 3s ease-in-out infinite;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.stat-card-wrapper.is-active .hologram-content {
  animation: holoFlicker 3s ease-in-out infinite, holoFloat 2s ease-in-out infinite;
}

@keyframes holoFlicker {
  0%, 100% { opacity: 0.9; }
  92% { opacity: 0.9; }
  93% { opacity: 0.4; }
  94% { opacity: 0.9; }
  96% { opacity: 0.7; }
  97% { opacity: 0.9; }
}

@keyframes holoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.holo-icon {
  color: #5EDFFF;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 10px rgba(94, 223, 255, 0.5));
  animation: holoIconPulse 2s ease-in-out infinite;
}

@keyframes holoIconPulse {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(94, 223, 255, 0.5)); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(94, 223, 255, 0.8)); }
}

.holo-value {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #5EDFFF;
  text-shadow: 0 0 20px rgba(94, 223, 255, 0.8), 0 0 40px rgba(94, 223, 255, 0.4);
  line-height: 1;
}

.holo-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.25rem;
}

.holo-detail {
  font-size: 0.625rem;
  color: rgba(94, 223, 255, 0.7);
  margin-top: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: rgba(94, 223, 255, 0.1);
  border-radius: 9999px;
  border: 1px solid rgba(94, 223, 255, 0.2);
}

/* Hologram Base */
.hologram-base {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  color: rgba(94, 223, 255, 0.4);
  animation: baseRotate 8s linear infinite;
}

@keyframes baseRotate {
  from { transform: translateX(-50%) rotateY(0deg); }
  to { transform: translateX(-50%) rotateY(360deg); }
}

/* Hologram Glow */
.hologram-glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(94, 223, 255, 0.3) 0%, transparent 70%);
  filter: blur(20px);
  animation: glowPulse 2s ease-in-out infinite;
}

/* Data Streams */
.data-streams {
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  height: 40px;
  overflow: hidden;
}

.data-stream {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to top, rgba(94, 223, 255, 0.6), transparent);
  animation: streamUp 1.5s ease-out infinite;
}

@keyframes streamUp {
  0% { 
    opacity: 0;
    transform: translateY(100%) scaleY(0.5);
  }
  50% {
    opacity: 1;
  }
  100% { 
    opacity: 0;
    transform: translateY(-100%) scaleY(1);
  }
}

/* Active state for stat card */
.stat-card-wrapper.is-active .stat-card {
  border-color: rgba(94, 223, 255, 0.5);
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 80px rgba(94, 223, 255, 0.2),
    inset 0 0 30px rgba(94, 223, 255, 0.05);
}

.stat-card-wrapper.is-active .card-glow {
  opacity: 1;
}

.stat-card-wrapper.is-active .card-scan-line {
  opacity: 0.5;
  animation: cardScan 2s ease-in-out infinite;
}

.stat-card-wrapper.is-active .stat-bar-fill {
  width: 100%;
}

.stat-card-wrapper.is-active .icon-ring {
  border-color: rgba(94, 223, 255, 0.6);
  transform: rotate(45deg) scale(1.15);
  box-shadow: 0 0 20px rgba(94, 223, 255, 0.3);
}

.stat-card-wrapper.is-active .icon-glow {
  opacity: 1;
}

.stat-card-wrapper.is-active .stat-value-glow {
  opacity: 0.6;
}

/* Mobile adjustments */
@media (max-width: 1023px) {
  .hologram-container {
    width: 200px;
    height: 180px;
  }
  
  .hologram-content {
    height: 140px;
    padding: 0.75rem;
  }
  
  .holo-value {
    font-size: 1.75rem;
  }
  
  .holo-icon {
    font-size: 1.5rem;
  }
}
</style>

<template>
  <div
    class="relative overflow-hidden bg-[#020810]"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
  >
    <!-- Animated Grid Background -->
    <div class="hero-grid"></div>
    
    <!-- Scan Lines -->
    <div class="scan-line scan-line-1"></div>
    <div class="scan-line scan-line-2"></div>

    <!-- Circuit SVG -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hero-circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="transparent" />
          <stop offset="50%" stop-color="#5EDFFF" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
      </defs>
      <line class="circuit-line" x1="0" y1="20%" x2="30%" y2="20%" stroke="url(#hero-circuit-grad)" stroke-width="1" />
      <line class="circuit-line circuit-delay-1" x1="70%" y1="80%" x2="100%" y2="80%" stroke="url(#hero-circuit-grad)" stroke-width="1" />
      <line class="circuit-line circuit-delay-2" x1="0" y1="60%" x2="15%" y2="60%" stroke="url(#hero-circuit-grad)" stroke-width="1" />
    </svg>

    <!-- Floating Particles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(p, i) in floatingParticles"
        :key="`float-${i}`"
        class="floating-particle"
        :style="{ left: p.x, top: p.y, animationDelay: p.delay, '--size': p.size }"
      ></span>
    </div>

    <section
      id="hero"
      class="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-24 text-white lg:flex-row lg:items-center lg:gap-16"
    >
      <!-- Left Content -->
      <div class="flex-1 space-y-8">
        <!-- Terminal Tag -->
        <div class="terminal-tag hero-animate">
          <span class="terminal-dot"></span>
          <span class="terminal-text">~/developer</span>
          <span class="terminal-cursor">_</span>
        </div>

        <!-- Title with Glitch Effect -->
        <div class="space-y-4">
          <h1 class="hero-title hero-animate hero-delay-1">
            Bonjour, je suis
            <span class="title-highlight">
              <span class="title-text">Stevy</span>
              <span class="title-glow">Stevy</span>
            </span>
            <br />
            <span class="title-secondary">OBAME</span>
          </h1>
          
          <!-- Role Badge -->
          <div class="role-badge hero-animate hero-delay-2">
            <span class="role-dot"></span>
            <span>Développeur Full-Stack</span>
            <span class="role-separator">|</span>
            <span class="text-[#57F2CB]">Créateur Digital</span>
          </div>
        </div>

        <!-- Description -->
        <p class="max-w-xl text-lg text-white/60 leading-relaxed hero-animate hero-delay-2">
          Je conçois des expériences modernes et évolutives avec un code propre, 
          des interfaces expressives et un storytelling immersif.
        </p>

        <!-- Tech Stack -->
        <div class="flex flex-wrap gap-2 hero-animate hero-delay-3">
          <span v-for="tech in techStack" :key="tech" class="tech-badge">
            {{ tech }}
          </span>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4 hero-animate hero-delay-3">
          <NuxtLink to="#projects" class="cta-primary group">
            <span class="cta-bg"></span>
            <span class="cta-shine"></span>
            <span class="relative z-10 flex items-center gap-2">
              <span>Voir mes projets</span>
              <Icon icon="mdi:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </NuxtLink>
          <NuxtLink to="#contact" class="cta-secondary group">
            <span class="cta-border"></span>
            <span class="relative z-10 flex items-center gap-2">
              <Icon icon="mdi:message-outline" class="w-4 h-4" />
              <span>Me contacter</span>
            </span>
          </NuxtLink>
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-6 hero-animate hero-delay-4">
          <div class="flex items-center gap-2">
            <span class="w-8 h-px bg-gradient-to-r from-[#5EDFFF]/50 to-transparent"></span>
            <span class="text-xs uppercase tracking-widest text-white/40">Connect</span>
          </div>
          <div class="flex gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="social-link"
              :aria-label="social.name"
            >
              <Icon :icon="social.icon" class="w-5 h-5 relative z-10" />
              <span class="social-glow"></span>
              <span class="social-ring"></span>
            </a>
          </div>
        </div>
      </div>

      <!-- Right Content - Image -->
      <div class="flex-1 relative">
        <!-- Decorative Elements -->
        <div class="image-decoration">
          <div class="deco-ring deco-ring-1"></div>
          <div class="deco-ring deco-ring-2"></div>
          <div class="deco-ring deco-ring-3"></div>
        </div>

        <div
          class="image-container"
          :style="{ transform: imageTilt }"
        >
          <!-- Corner Accents -->
          <div class="corner-accent corner-tl"></div>
          <div class="corner-accent corner-br"></div>

          <!-- Floating Tech Badges -->
          <div class="tech-float tech-float-1 floating-badge">
            <Icon icon="mdi:language-javascript" class="w-5 h-5 text-yellow-400" />
            <span>JavaScript</span>
          </div>
          <div class="tech-float tech-float-2 floating-badge floating-delay-1">
            <Icon icon="mdi:vuejs" class="w-5 h-5 text-green-400" />
            <span>Vue.js</span>
          </div>
          <div class="tech-float tech-float-3 floating-badge floating-delay-2">
            <Icon icon="mdi:firebase" class="w-5 h-5 text-orange-400" />
            <span>Firebase</span>
          </div>

          <!-- Image Frame -->
          <div class="image-frame">
            <div class="frame-scanline"></div>
            <div class="frame-glow"></div>
            <NuxtImg 
              src="/stevy.png" 
              alt="Stevy OBAME" 
              class="hero-image" 
              width="600" 
              height="800"
            />
          </div>

          <!-- Status Badge -->
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>Disponible</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Background Effects -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#5EDFFF]/5 blur-[150px] animate-pulse-slow"></div>
      <div class="absolute -left-20 bottom-1/4 h-80 w-80 rounded-full bg-[#5EDFFF]/10 blur-[120px] animate-pulse-slow delay-1000"></div>
      <div class="absolute -right-20 top-1/3 h-60 w-60 rounded-full bg-[#57F2CB]/10 blur-[100px] animate-pulse-slow delay-2000"></div>
    </div>

    <!-- Bottom Gradient -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020810] to-transparent pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const tilt = ref({ x: 0, y: 0 });

const floatingParticles = Array.from({ length: 25 }, () => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  size: `${3 + Math.random() * 5}px`
}));

const techStack = ['Vue.js', 'Nuxt', 'TypeScript', 'Firebase', 'Tailwind'];

const socials = [
  { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com/ghos-spec' },
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com' },
  { name: 'Email', icon: 'mdi:email-outline', url: 'mailto:stevyobame163@gmail.com' }
];

const handleMouseMove = (event: MouseEvent) => {
  const { currentTarget, clientX, clientY } = event;
  if (!(currentTarget instanceof HTMLElement)) return;

  const rect = currentTarget.getBoundingClientRect();
  const offsetX = clientX - (rect.left + rect.width / 2);
  const offsetY = clientY - (rect.top + rect.height / 2);
  tilt.value = {
    x: (offsetX / rect.width) * 8,
    y: (-offsetY / rect.height) * 8
  };
};

const resetTilt = () => {
  tilt.value = { x: 0, y: 0 };
};

const imageTilt = computed(() => `rotateX(${tilt.value.y}deg) rotateY(${tilt.value.x}deg)`);
</script>

<style scoped>
/* Grid Background */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(94, 223, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 223, 255, 0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  animation: gridMove 30s linear infinite;
}

@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: 80px 80px; }
}

/* Scan Lines */
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(94, 223, 255, 0.4), transparent);
  opacity: 0.5;
}

.scan-line-1 {
  animation: scanDown 6s ease-in-out infinite;
}

.scan-line-2 {
  animation: scanDown 6s ease-in-out infinite 3s;
}

@keyframes scanDown {
  0%, 100% { top: -2px; opacity: 0; }
  10% { opacity: 0.5; }
  90% { opacity: 0.5; }
  100% { top: 100%; opacity: 0; }
}

/* Circuit Lines */
.circuit-line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawCircuit 4s ease-in-out infinite;
}

.circuit-delay-1 { animation-delay: 1s; }
.circuit-delay-2 { animation-delay: 2s; }

@keyframes drawCircuit {
  0%, 100% { stroke-dashoffset: 200; }
  50% { stroke-dashoffset: 0; }
}

/* Floating Particles */
.floating-particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, #5EDFFF 0%, transparent 70%);
  border-radius: 50%;
  animation: particleFloat 10s ease-in-out infinite, particleTwinkle 4s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(20px, -30px); }
  50% { transform: translate(-10px, -20px); }
  75% { transform: translate(15px, -40px); }
}

@keyframes particleTwinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.7; }
}

/* Animations */
.hero-animate {
  opacity: 0;
  transform: translateY(30px);
  animation: heroFadeUp 0.8s forwards cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-delay-1 { animation-delay: 0.1s; }
.hero-delay-2 { animation-delay: 0.2s; }
.hero-delay-3 { animation-delay: 0.35s; }
.hero-delay-4 { animation-delay: 0.5s; }

@keyframes heroFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Terminal Tag */
.terminal-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(94, 223, 255, 0.05);
  border: 1px solid rgba(94, 223, 255, 0.2);
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
}

.terminal-dot {
  width: 8px;
  height: 8px;
  background: #57F2CB;
  border-radius: 50%;
  animation: terminalPulse 2s ease-in-out infinite;
}

@keyframes terminalPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(87, 242, 203, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(87, 242, 203, 0); }
}

.terminal-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.terminal-cursor {
  color: #5EDFFF;
  animation: cursorBlink 1s step-end infinite;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Hero Title */
.hero-title {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  color: white;
}

.title-highlight {
  position: relative;
  display: inline-block;
}

.title-text {
  position: relative;
  z-index: 1;
  color: #5EDFFF;
}

.title-glow {
  position: absolute;
  inset: 0;
  color: #5EDFFF;
  filter: blur(20px);
  opacity: 0.5;
}

.title-secondary {
  color: rgba(255, 255, 255, 0.9);
}

/* Role Badge */
.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.6);
}

.role-dot {
  width: 6px;
  height: 6px;
  background: #5EDFFF;
  border-radius: 50%;
}

.role-separator {
  color: rgba(255, 255, 255, 0.2);
}

/* Tech Badge */
.tech-badge {
  padding: 6px 14px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #5EDFFF;
  background: rgba(94, 223, 255, 0.05);
  border: 1px solid rgba(94, 223, 255, 0.15);
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.tech-badge:hover {
  background: rgba(94, 223, 255, 0.1);
  border-color: rgba(94, 223, 255, 0.3);
  box-shadow: 0 0 20px rgba(94, 223, 255, 0.15);
}

/* CTA Buttons */
.cta-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #041028;
  border-radius: 12px;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5EDFFF, #57F2CB);
  transition: transform 0.3s ease;
}

.cta-primary:hover .cta-bg {
  transform: scale(1.05);
}

.cta-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

.cta-secondary {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cta-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.cta-secondary:hover .cta-border {
  border-color: rgba(94, 223, 255, 0.4);
  box-shadow: 0 0 30px rgba(94, 223, 255, 0.1);
}

.cta-secondary:hover {
  color: #5EDFFF;
}

/* Social Links */
.social-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.social-link:hover {
  color: #5EDFFF;
  transform: translateY(-3px);
}

.social-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(94, 223, 255, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover .social-glow {
  opacity: 1;
}

.social-ring {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.social-link:hover .social-ring {
  border-color: rgba(94, 223, 255, 0.3);
}

/* Image Section */
.image-decoration {
  position: absolute;
  inset: -20px;
  pointer-events: none;
}

.deco-ring {
  position: absolute;
  inset: 0;
  border: 1px dashed rgba(94, 223, 255, 0.1);
  border-radius: 50%;
  animation: rotate 30s linear infinite;
}

.deco-ring-1 { transform: scale(0.8); animation-duration: 25s; }
.deco-ring-2 { transform: scale(1); animation-duration: 35s; animation-direction: reverse; }
.deco-ring-3 { transform: scale(1.2); animation-duration: 45s; }

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.image-container {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.corner-accent {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(94, 223, 255, 0.3);
  pointer-events: none;
}

.corner-tl {
  top: -10px;
  left: -10px;
  border-right: none;
  border-bottom: none;
  border-radius: 12px 0 0 0;
}

.corner-br {
  bottom: -10px;
  right: -10px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 12px 0;
}

/* Tech Float Badges */
.tech-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  z-index: 20;
}

.tech-float-1 { top: 10%; left: -20px; }
.tech-float-2 { top: 30%; right: -30px; }
.tech-float-3 { bottom: 15%; left: -10px; }

.floating-badge {
  animation: floatBadge 6s ease-in-out infinite;
}

.floating-delay-1 { animation-delay: 1s; }
.floating-delay-2 { animation-delay: 2s; }

@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Image Frame */
.image-frame {
  position: relative;
  padding: 12px;
  background: linear-gradient(135deg, rgba(94, 223, 255, 0.1) 0%, rgba(87, 242, 203, 0.05) 100%);
  border: 1px solid rgba(94, 223, 255, 0.2);
  border-radius: 24px;
  overflow: hidden;
}

.frame-scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #5EDFFF, transparent);
  opacity: 0.3;
  animation: frameScan 3s ease-in-out infinite;
}

@keyframes frameScan {
  0%, 100% { top: 0; }
  50% { top: 100%; }
}

.frame-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(94, 223, 255, 0.2) 0%, transparent 50%);
  pointer-events: none;
}

.hero-image {
  display: block;
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

/* Status Badge */
.status-badge {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(87, 242, 203, 0.3);
  border-radius: 9999px;
  z-index: 20;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #57F2CB;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(87, 242, 203, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(87, 242, 203, 0); }
}

/* Background Animations */
.animate-pulse-slow {
  animation: pulseSlow 8s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.delay-1000 { animation-delay: 1s; }
.delay-2000 { animation-delay: 2s; }
</style>

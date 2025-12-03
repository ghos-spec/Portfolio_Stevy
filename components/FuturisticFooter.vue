<template>
  <footer class="relative overflow-hidden bg-[#020810] pt-20 pb-8">
    <!-- Animated Grid Background -->
    <div class="absolute inset-0 grid-background"></div>
    
    <!-- Scan Line Effect -->
    <div class="scan-line"></div>
    
    <!-- Floating Particles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="i"
        class="particle"
        :style="{ left: p.x, top: p.y, animationDelay: p.delay, '--size': p.size }"
      ></span>
    </div>

    <!-- Circuit Lines -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="transparent" />
          <stop offset="50%" stop-color="#5EDFFF" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
      </defs>
      <line class="circuit-line circuit-line-1" x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#circuit-gradient)" stroke-width="1" />
      <line class="circuit-line circuit-line-2" x1="0" y1="70%" x2="100%" y2="70%" stroke="url(#circuit-gradient)" stroke-width="1" />
    </svg>

    <!-- Glowing Orbs -->
    <div class="absolute -left-32 top-1/2 w-64 h-64 bg-[#5EDFFF]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
    <div class="absolute -right-32 top-1/4 w-48 h-48 bg-[#57F2CB]/10 rounded-full blur-[80px] animate-pulse-slow delay-1000"></div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <!-- Top Divider -->
      <div class="relative mb-16">
        <div class="h-px bg-gradient-to-r from-transparent via-[#5EDFFF]/50 to-transparent"></div>
        <div class="absolute left-1/2 -translate-x-1/2 -top-2 flex items-center gap-2">
          <span class="w-1 h-1 bg-[#5EDFFF] rounded-full animate-ping-slow"></span>
          <span class="w-2 h-2 bg-[#5EDFFF] rounded-full glow-dot"></span>
          <span class="w-1 h-1 bg-[#5EDFFF] rounded-full animate-ping-slow delay-500"></span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
        <!-- Brand Column -->
        <div class="space-y-6">
          <div class="group relative inline-block">
            <h3 class="font-display text-3xl font-bold text-white tracking-tight">
              <span class="relative">
                Stevy
                <span class="absolute -inset-1 bg-[#5EDFFF]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </span>
              <span class="text-[#5EDFFF]">.</span>
            </h3>
            <div class="mt-1 h-0.5 w-0 bg-gradient-to-r from-[#5EDFFF] to-[#57F2CB] group-hover:w-full transition-all duration-500"></div>
          </div>
          <p class="text-white/50 text-sm leading-relaxed max-w-xs">
            Développeur Full-Stack passionné par les expériences digitales innovantes et les interfaces du futur.
          </p>
          
          <!-- Tech Stack Pills -->
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in ['Vue', 'Nuxt', 'Firebase']" :key="tech" 
              class="tech-pill">
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Navigation -->
        <div class="space-y-6">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="space-y-3">
            <li v-for="link in navLinks" :key="link.name">
              <NuxtLink :to="link.href" class="footer-link group">
                <span class="link-indicator"></span>
                <span>{{ link.name }}</span>
                <Icon icon="mdi:chevron-right" class="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="space-y-6">
          <h4 class="footer-heading">Contact</h4>
          <ul class="space-y-4">
            <li>
              <a href="mailto:stevyobame163@gmail.com" class="footer-link group">
                <div class="contact-icon-wrapper">
                  <Icon icon="mdi:email-outline" class="w-4 h-4" />
                </div>
                <span class="text-sm">stevyobame163@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="#" class="footer-link group">
                <div class="contact-icon-wrapper">
                  <Icon icon="mdi:map-marker-outline" class="w-4 h-4" />
                </div>
                <span class="text-sm">Libreville, Gabon</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Social & CTA -->
        <div class="space-y-6">
          <h4 class="footer-heading">Connectons-nous</h4>
          
          <!-- Social Links -->
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank"
              class="social-link" :aria-label="social.name">
              <Icon :icon="social.icon" class="w-5 h-5 relative z-10" />
              <span class="social-glow" :style="{ '--glow-color': social.color }"></span>
            </a>
          </div>

          <!-- CTA Button -->
          <a href="#contact" class="cta-button group">
            <span class="cta-bg"></span>
            <span class="relative z-10 flex items-center gap-2">
              <span>Démarrer un projet</span>
              <Icon icon="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span class="cta-shine"></span>
          </a>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-16 pt-8 border-t border-white/5">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Copyright -->
          <div class="flex items-center gap-2 text-white/40 text-sm">
            <span class="inline-block w-2 h-2 bg-[#5EDFFF] rounded-full animate-pulse"></span>
            <span>© {{ currentYear }} Stevy OBAME. Tous droits réservés.</span>
          </div>

          <!-- Status Indicator -->
          <div class="flex items-center gap-4">
            <div class="status-indicator">
              <span class="status-dot"></span>
              <span class="text-xs text-white/50">Disponible pour missions</span>
            </div>
          </div>

          <!-- Scroll to top -->
          <button @click="scrollToTop" class="scroll-top-btn group" aria-label="Retour en haut">
            <Icon icon="mdi:chevron-up" class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span class="scroll-top-ring"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Glow Line -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5EDFFF]/30 to-transparent"></div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();

const particles = Array.from({ length: 20 }, () => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  size: `${2 + Math.random() * 4}px`
}));

const navLinks = [
  { name: 'Accueil', href: '#hero' },
  { name: 'Projets', href: '#projects' },
  { name: 'À propos', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

const socials = [
  { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com/ghos-spec', color: '#fff' },
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'Twitter', icon: 'mdi:twitter', url: 'https://twitter.com', color: '#1DA1F2' },
  { name: 'Dribbble', icon: 'mdi:dribbble', url: 'https://dribbble.com', color: '#EA4C89' }
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
@reference "tailwindcss";

/* Grid Background */
.grid-background {
  background-image: 
    linear-gradient(rgba(94, 223, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 223, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

/* Scan Line */
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #5EDFFF, transparent);
  opacity: 0.3;
  animation: scanDown 4s ease-in-out infinite;
}

@keyframes scanDown {
  0%, 100% { top: 0; opacity: 0; }
  10% { opacity: 0.3; }
  90% { opacity: 0.3; }
  100% { top: 100%; opacity: 0; }
}

/* Particles */
.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, #5EDFFF 0%, transparent 70%);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite, twinkle 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-10px) translateX(-10px); }
  75% { transform: translateY(-30px) translateX(5px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
}

/* Circuit Lines */
.circuit-line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawLine 3s ease-in-out infinite;
}

.circuit-line-1 { animation-delay: 0s; }
.circuit-line-2 { animation-delay: 1.5s; }

@keyframes drawLine {
  0%, 100% { stroke-dashoffset: 100; }
  50% { stroke-dashoffset: 0; }
}

/* Animations */
.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.animate-ping-slow {
  animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pingSlow {
  75%, 100% { transform: scale(2); opacity: 0; }
}

.glow-dot {
  box-shadow: 0 0 10px #5EDFFF, 0 0 20px #5EDFFF, 0 0 30px #5EDFFF;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 10px #5EDFFF, 0 0 20px #5EDFFF; }
  50% { box-shadow: 0 0 20px #5EDFFF, 0 0 40px #5EDFFF, 0 0 60px #5EDFFF; }
}

/* Footer Heading */
.footer-heading {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  display: inline-block;
}

.footer-heading::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #5EDFFF, transparent);
}

/* Footer Link */
.footer-link {
  @apply flex items-center gap-3 text-white/60 transition-all duration-300;
}

.footer-link:hover {
  @apply text-[#5EDFFF] translate-x-1;
}

.link-indicator {
  @apply w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-300;
}

.footer-link:hover .link-indicator {
  @apply bg-[#5EDFFF] shadow-[0_0_10px_#5EDFFF];
}

/* Contact Icon */
.contact-icon-wrapper {
  @apply flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-[#5EDFFF] transition-all duration-300;
}

.footer-link:hover .contact-icon-wrapper {
  @apply bg-[#5EDFFF]/10 border-[#5EDFFF]/30 shadow-[0_0_20px_rgba(94,223,255,0.2)];
}

/* Tech Pills */
.tech-pill {
  @apply px-3 py-1 text-xs font-medium text-[#5EDFFF] bg-[#5EDFFF]/5 border border-[#5EDFFF]/20 rounded-full;
  transition: all 0.3s ease;
}

.tech-pill:hover {
  @apply bg-[#5EDFFF]/10 border-[#5EDFFF]/40;
  box-shadow: 0 0 20px rgba(94, 223, 255, 0.2);
}

/* Social Links */
.social-link {
  @apply relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all duration-300 overflow-hidden;
}

.social-link:hover {
  @apply text-white border-[#5EDFFF]/50 -translate-y-1;
}

.social-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--glow-color), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover .social-glow {
  opacity: 0.2;
}

/* CTA Button */
.cta-button {
  @apply relative flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-[#041028] overflow-hidden;
}

.cta-bg {
  @apply absolute inset-0 bg-gradient-to-r from-[#5EDFFF] to-[#57F2CB] transition-transform duration-300;
}

.cta-button:hover .cta-bg {
  @apply scale-105;
}

.cta-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

/* Status Indicator */
.status-indicator {
  @apply flex items-center gap-2;
}

.status-dot {
  @apply w-2 h-2 rounded-full bg-[#57F2CB];
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(87, 242, 203, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(87, 242, 203, 0); }
}

/* Scroll to Top */
.scroll-top-btn {
  @apply relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 transition-all duration-300;
}

.scroll-top-btn:hover {
  @apply text-[#5EDFFF] border-[#5EDFFF]/50 bg-[#5EDFFF]/10;
}

.scroll-top-ring {
  @apply absolute inset-0 rounded-full border border-[#5EDFFF]/0;
  transition: all 0.3s ease;
}

.scroll-top-btn:hover .scroll-top-ring {
  @apply border-[#5EDFFF]/30;
  animation: ringPulse 1s ease-out infinite;
}

@keyframes ringPulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Delay utilities */
.delay-500 { animation-delay: 0.5s; }
.delay-1000 { animation-delay: 1s; }
</style>

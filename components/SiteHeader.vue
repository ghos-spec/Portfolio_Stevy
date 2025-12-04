<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-500',
      isScrolled ? 'header-scrolled' : 'header-top'
    ]"
  >
    <!-- Animated Border Bottom -->
    <div class="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
      <div class="header-border-line"></div>
    </div>

    <!-- Scan Line Effect -->
    <div v-if="isScrolled" class="header-scan-line"></div>

    <div class="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 text-white">
      <!-- Logo with Glow -->
      <NuxtLink to="/" class="logo-wrapper group relative">
        <span class="logo-glow"></span>
        <NuxtImg src="/logo/stevyl.png" alt="Logo Stevy" class="relative z-10 h-10 w-auto transition-transform duration-300 group-hover:scale-105" width="120" height="55" />
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link group"
        >
          <span class="nav-link-indicator"></span>
          <span class="relative z-10">{{ link.label }}</span>
          <span class="nav-link-glow"></span>
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <!-- Status Indicator -->
        <div class="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 lg:flex">
          <span class="status-dot"></span>
          <span class="text-xs text-white/50">Disponible</span>
        </div>

        <!-- <NuxtLink
          to="/admin/login"
          class="admin-btn hidden lg:inline-flex"
        >
          <Icon icon="mdi:shield-account" class="w-4 h-4" />
          <span>Admin</span>
        </NuxtLink> -->

        <!-- CTA Button -->
        <!-- <button type="button" class="cta-btn group hidden lg:inline-flex">
          <span class="cta-bg"></span>
          <span class="cta-shine"></span>
          <span class="relative z-10 flex items-center gap-2">
            <span>Hire Me</span>
            <Icon icon="mdi:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </button> -->

        <!-- Mobile Menu Button -->
        <button 
          type="button" 
          class="mobile-menu-btn lg:hidden"
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu()"
        >
          <span class="menu-line menu-line-1"></span>
          <span class="menu-line menu-line-2"></span>
          <span class="menu-line menu-line-3"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-fade">
      <div v-if="isMenuOpen" class="mobile-menu lg:hidden">
        <!-- Grid Background -->
        <div class="mobile-menu-grid"></div>
        
        <nav class="relative z-10 flex flex-col gap-2 p-6">
          <NuxtLink
            v-for="(link, index) in navLinks"
            :key="`mobile-${link.to}`"
            :to="link.to"
            class="mobile-nav-link"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="toggleMenu(false)"
          >
            <span class="mobile-link-indicator"></span>
            <span>{{ link.label }}</span>
            <Icon icon="mdi:chevron-right" class="w-4 h-4 ml-auto opacity-40" />
          </NuxtLink>

          <div class="my-4 h-px bg-gradient-to-r from-transparent via-[#5EDFFF]/20 to-transparent"></div>

          <!-- <NuxtLink
            to="/admin/login"
            class="mobile-nav-link"
            @click="toggleMenu(false)"
          >
            <Icon icon="mdi:shield-account" class="w-4 h-4 text-[#5EDFFF]" />
            <span>Accès admin</span>
          </NuxtLink> -->

          <!-- <NuxtLink
            to="/contact"
            class="mobile-cta-btn mt-4"
            @click="toggleMenu(false)"
          >
            <span class="cta-bg"></span>
            <span class="relative z-10 flex items-center gap-2">
              <Icon icon="mdi:email-send-outline" class="w-5 h-5" />
              Accéder au formulaire
            </span>
          </NuxtLink> -->
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Compétences', to: '/competences' },
  { label: 'Projets', to: '/projets' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' }
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
/* Header States */
.header-top {
  background: linear-gradient(to right, rgba(10, 25, 47, 0.8), rgba(2, 12, 27, 0.9), rgba(10, 25, 47, 0.8));
}

.header-scrolled {
  background: linear-gradient(to right, rgba(10, 25, 47, 0.95), rgba(2, 12, 27, 0.98), rgba(10, 25, 47, 0.95));
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 80px rgba(94, 223, 255, 0.05);
}

/* Animated Border */
.header-border-line {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, transparent, #5EDFFF, transparent);
  animation: borderFlow 3s linear infinite;
}

@keyframes borderFlow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Scan Line */
.header-scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(94, 223, 255, 0.5), transparent);
  animation: headerScan 2s ease-in-out infinite;
}

@keyframes headerScan {
  0%, 100% { top: 0; opacity: 0; }
  50% { top: 100%; opacity: 0.5; }
}

/* Logo */
.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(94, 223, 255, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.logo-wrapper:hover .logo-glow {
  opacity: 1;
}

/* Nav Links */
.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  overflow: hidden;
}

.nav-link:hover {
  color: #5EDFFF;
}

.nav-link-indicator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.nav-link:hover .nav-link-indicator {
  background: #5EDFFF;
  box-shadow: 0 0 10px #5EDFFF;
}

.nav-link-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(94, 223, 255, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link:hover .nav-link-glow {
  opacity: 1;
}

/* Status Dot */
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #57F2CB;
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(87, 242, 203, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(87, 242, 203, 0); }
}

/* Admin Button */
.admin-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
}

.admin-btn:hover {
  color: #5EDFFF;
  border-color: rgba(94, 223, 255, 0.3);
  background: rgba(94, 223, 255, 0.05);
  box-shadow: 0 0 20px rgba(94, 223, 255, 0.1);
}

/* CTA Button */
.cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #041028;
  border-radius: 9999px;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5EDFFF, #57F2CB);
  transition: transform 0.3s ease;
}

.cta-btn:hover .cta-bg {
  transform: scale(1.05);
}

.cta-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: ctaShine 3s ease-in-out infinite;
}

@keyframes ctaShine {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

/* Mobile Menu Button - Only visible on small screens */
.mobile-menu-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .mobile-menu-btn {
    display: none !important;
  }
}

.mobile-menu-btn:hover {
  border-color: rgba(94, 223, 255, 0.3);
  background: rgba(94, 223, 255, 0.05);
}

.menu-line {
  width: 20px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-line-1 { transform: translateY(-6px); }
.menu-line-3 { transform: translateY(6px); }

.mobile-menu-btn.is-active .menu-line-1 {
  transform: translateY(0) rotate(45deg);
}

.mobile-menu-btn.is-active .menu-line-2 {
  opacity: 0;
  transform: scaleX(0);
}

.mobile-menu-btn.is-active .menu-line-3 {
  transform: translateY(0) rotate(-45deg);
} 

/* Mobile Menu */
.mobile-menu {
  position: relative;
  border-top: 1px solid rgba(94, 223, 255, 0.1);
  background: linear-gradient(to bottom, rgba(2, 6, 20, 0.98), rgba(4, 9, 20, 0.99));
  overflow: hidden;
}

.mobile-menu-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(94, 223, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 223, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease forwards;
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-nav-link:hover {
  background: rgba(94, 223, 255, 0.05);
  color: #5EDFFF;
}

.mobile-link-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(94, 223, 255, 0.3);
  transition: all 0.3s ease;
}

.mobile-nav-link:hover .mobile-link-indicator {
  background: #5EDFFF;
  box-shadow: 0 0 10px #5EDFFF;
}

.mobile-cta-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #041028;
  border-radius: 12px;
  overflow: hidden;
}

.mobile-cta-btn .cta-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5EDFFF, #57F2CB);
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

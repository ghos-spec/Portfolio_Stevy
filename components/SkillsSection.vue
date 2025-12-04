<template>
  <section class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#020810] via-[#040d1a] to-[#020810]"></div>
    <div class="skills-grid-bg"></div>

    <!-- Floating particles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="i"
        class="skills-particle"
        :style="{ left: p.x, top: p.y, animationDelay: p.delay }"
      ></span>
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <!-- Header -->
      <div class="mb-12 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#5EDFFF]/5 border border-[#5EDFFF]/20 rounded-full">
          <span class="w-2 h-2 bg-[#57F2CB] rounded-full animate-pulse"></span>
          <span class="text-sm text-[#5EDFFF] font-mono">skills.load()</span>
        </div>
        <h1 class="section-title">
          Mes <span class="text-gradient">Compétences</span>
        </h1>
        <p class="mt-4 max-w-xl mx-auto text-white/50 text-lg">
          Un stack moderne orienté produit : du front expressif au backend Firebase, pour livrer des expériences complètes de A à Z.
        </p>
      </div>

      <!-- Stack principale : tags rapides -->
      <div class="mb-16">
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="tech in mainStack"
            :key="tech"
            class="px-3 py-1 text-xs font-medium rounded-full border border-[#5EDFFF]/30 bg-[#020810]/80 text-[#5EDFFF] backdrop-blur-sm"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="space-y-16">
        <!-- Bloc Front-end & UI -->
        <div>
          <div class="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h2 class="skills-subtitle">Front-end & UI</h2>
            <p class="skills-section-description">
              Interfaces réactives, SEO-friendly et pensées pour l'expérience utilisateur.
            </p>
          </div>

          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-container">
            <div
              v-for="(skill, index) in frontEndSkills"
              :key="skill.name"
              class="skill-card-wrapper"
              :style="{ animationDelay: `${index * 140}ms` }"
            >
              <div class="skill-card group">
                <div class="skill-card-glow"></div>
                <div class="skill-scan-line"></div>

                <div class="skill-header">
                  <div class="skill-icon-wrapper">
                    <div class="skill-icon-ring"></div>
                    <div class="skill-icon-glow"></div>
                    <Icon :icon="skill.icon" class="relative z-10 text-2xl text-[#5EDFFF]" aria-hidden="true" />
                  </div>

                  <div class="skill-meta">
                    <h3 class="skill-title">{{ skill.name }}</h3>
                    <p class="skill-level">{{ skill.level }}</p>
                  </div>
                </div>

                <p class="skill-description">
                  {{ skill.description }}
                </p>

                <div class="skill-footer">
                  <span
                    v-for="tag in skill.tags"
                    :key="tag"
                    class="skill-tag"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="skill-orbit">
                  <span class="orbit-dot orbit-dot-1"></span>
                  <span class="orbit-dot orbit-dot-2"></span>
                  <span class="orbit-dot orbit-dot-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bloc Back-end & BaaS (Firebase) -->
        <div>
          <div class="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h2 class="skills-subtitle">Back-end & BaaS (Firebase)</h2>
            <p class="skills-section-description">
              De l'API sécurisée au stockage temps réel pour connecter l'interface aux données.
            </p>
          </div>

          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-container">
            <div
              v-for="(skill, index) in backEndSkills"
              :key="skill.name"
              class="skill-card-wrapper"
              :style="{ animationDelay: `${index * 140}ms` }"
            >
              <div class="skill-card group">
                <div class="skill-card-glow"></div>
                <div class="skill-scan-line"></div>

                <div class="skill-header">
                  <div class="skill-icon-wrapper">
                    <div class="skill-icon-ring"></div>
                    <div class="skill-icon-glow"></div>
                    <Icon :icon="skill.icon" class="relative z-10 text-2xl text-[#5EDFFF]" aria-hidden="true" />
                  </div>

                  <div class="skill-meta">
                    <h3 class="skill-title">{{ skill.name }}</h3>
                    <p class="skill-level">{{ skill.level }}</p>
                  </div>
                </div>

                <p class="skill-description">
                  {{ skill.description }}
                </p>

                <div class="skill-footer">
                  <span
                    v-for="tag in skill.tags"
                    :key="tag"
                    class="skill-tag"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="skill-orbit">
                  <span class="orbit-dot orbit-dot-1"></span>
                  <span class="orbit-dot orbit-dot-2"></span>
                  <span class="orbit-dot orbit-dot-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bloc Design, vidéo & branding -->
        <div>
          <div class="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h2 class="skills-subtitle">Design, vidéo & branding</h2>
            <p class="skills-section-description">
              Donner une identité forte aux projets, du wireframe au contenu animé.
            </p>
          </div>

          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-container">
            <div
              v-for="(skill, index) in designSkills"
              :key="skill.name"
              class="skill-card-wrapper"
              :style="{ animationDelay: `${index * 140}ms` }"
            >
              <div class="skill-card group">
                <div class="skill-card-glow"></div>
                <div class="skill-scan-line"></div>

                <div class="skill-header">
                  <div class="skill-icon-wrapper">
                    <div class="skill-icon-ring"></div>
                    <div class="skill-icon-glow"></div>
                    <Icon :icon="skill.icon" class="relative z-10 text-2xl text-[#5EDFFF]" aria-hidden="true" />
                  </div>

                  <div class="skill-meta">
                    <h3 class="skill-title">{{ skill.name }}</h3>
                    <p class="skill-level">{{ skill.level }}</p>
                  </div>
                </div>

                <p class="skill-description">
                  {{ skill.description }}
                </p>

                <div class="skill-footer">
                  <span
                    v-for="tag in skill.tags"
                    :key="tag"
                    class="skill-tag"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="skill-orbit">
                  <span class="orbit-dot orbit-dot-1"></span>
                  <span class="orbit-dot orbit-dot-2"></span>
                  <span class="orbit-dot orbit-dot-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bloc Soft skills & façon de travailler -->
        <div>
          <div class="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h2 class="skills-subtitle">Soft skills & façon de travailler</h2>
            <p class="skills-section-description">
              Une collaboration ouverte, structurée et orientée résultats concrets.
            </p>
          </div>

          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-container">
            <div
              v-for="(skill, index) in softSkills"
              :key="skill.name"
              class="skill-card-wrapper"
              :style="{ animationDelay: `${index * 140}ms` }"
            >
              <div class="skill-card group">
                <div class="skill-card-glow"></div>
                <div class="skill-scan-line"></div>

                <div class="skill-header">
                  <div class="skill-icon-wrapper">
                    <div class="skill-icon-ring"></div>
                    <div class="skill-icon-glow"></div>
                    <Icon :icon="skill.icon" class="relative z-10 text-2xl text-[#5EDFFF]" aria-hidden="true" />
                  </div>

                  <div class="skill-meta">
                    <h3 class="skill-title">{{ skill.name }}</h3>
                    <p class="skill-level">{{ skill.level }}</p>
                  </div>
                </div>

                <p class="skill-description">
                  {{ skill.description }}
                </p>

                <div class="skill-footer">
                  <span
                    v-for="tag in skill.tags"
                    :key="tag"
                    class="skill-tag"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="skill-orbit">
                  <span class="orbit-dot orbit-dot-1"></span>
                  <span class="orbit-dot orbit-dot-2"></span>
                  <span class="orbit-dot orbit-dot-3"></span>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-10 text-center text-sm text-white/55 max-w-xl mx-auto">
            Mon objectif : livrer des projets qui fonctionnent vraiment, pas seulement des maquettes jolies.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Skill {
  name: string;
  icon: string;
  level: string;
  description: string;
  tags: string[];
}

const particles = Array.from({ length: 18 }, () => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`
}));

const mainStack = [
  'Vue 3',
  'Nuxt 3',
  'TypeScript',
  'Tailwind CSS',
  'Firebase (Auth, Firestore, Hosting)',
  'Git / GitHub'
];

const frontEndSkills: Skill[] = [
  {
    name: 'SPA & SSR avec Vue / Nuxt',
    icon: 'mdi:vuejs',
    level: 'Front-end moderne',
    description:
      'Création d\'interfaces réactives, SEO-friendly, avec routing, layouts et composables réutilisables.',
    tags: ['SPA', 'SSR', 'Nuxt 3']
  },
  {
    name: 'TypeScript',
    icon: 'mdi:language-typescript',
    level: 'Typage fort',
    description:
      'Typage fort pour éviter les bugs, clarifier les modèles de données et sécuriser les refactorings.',
    tags: ['Typage statique', 'Qualité', 'Maintenance']
  },
  {
    name: 'Tailwind CSS & UI design',
    icon: 'mdi:tailwind',
    level: 'Design d\'interface',
    description:
      'Designs modernes, responsive, avec animations propres qui renforcent l\'expérience sans la casser.',
    tags: ['Responsive', 'Design system', 'Animations']
  },
  {
    name: 'Performance & accessibilité',
    icon: 'mdi:lightning-bolt-outline',
    level: 'Expérience optimisée',
    description:
      'Optimisation des temps de chargement, bonnes pratiques HTML et attention portée à l\'accessibilité.',
    tags: ['Performance', 'Accessibilité', 'UX']
  }
];

const backEndSkills: Skill[] = [
  {
    name: 'Firebase (Firestore, Auth, Functions, Storage)',
    icon: 'mdi:firebase',
    level: 'BaaS complet',
    description:
      'APIs sécurisées, stockage des données, authentification et fonctions serverless pour accélérer le backend.',
    tags: ['Firestore', 'Auth', 'Cloud Functions']
  },
  {
    name: 'Intégration API & sécurisation',
    icon: 'mdi:shield-lock-outline',
    level: 'APIs robustes',
    description:
      'Écriture d\'endpoints, validation des inputs, gestion des erreurs et sécurisation des échanges.',
    tags: ['Validation', 'Sécurité', 'API REST']
  },
  {
    name: 'Architecture full-stack Nuxt + Firebase',
    icon: 'mdi:layers-triple-outline',
    level: 'Du front aux données',
    description:
      'De la maquette UI jusqu\'à la base de données, avec une architecture cohérente entre front et backend.',
    tags: ['Full-stack', 'Nuxt', 'Firebase']
  }
];

const designSkills: Skill[] = [
  {
    name: 'Design graphique & UI',
    icon: 'mdi:palette-outline',
    level: 'Identité visuelle',
    description:
      'Création de maquettes cohérentes avec l\'identité de marque, utilisation d\'outils comme Figma.',
    tags: ['UI', 'Figma', 'Branding']
  },
  {
    name: 'Montage vidéo & contenu',
    icon: 'mdi:movie-open-outline',
    level: 'Contenu animé',
    description:
      'Teasers de projets, vidéos de présentation et contenus dynamiques pour mettre les projets en valeur.',
    tags: ['Montage', 'Vidéo', 'Storytelling']
  },
  {
    name: 'Storytelling visuel',
    icon: 'mdi:chart-timeline-variant-shimmer',
    level: 'Expérience narrative',
    description:
      'Raconter une histoire à travers l\'interface, les visuels et les micro-interactions.',
    tags: ['Storytelling', 'UX', 'Narration']
  }
];

const softSkills: Skill[] = [
  {
    name: 'Collaboration & pédagogie',
    icon: 'mdi:account-group-outline',
    level: 'Travail en équipe',
    description:
      'Communication claire, capacité à vulgariser et à accompagner des interlocuteurs non techniques.',
    tags: ['Communication', 'Pédagogie']
  },
  {
    name: 'Autonomie & veille techno',
    icon: 'mdi:radar',
    level: 'Proactivité',
    description:
      'Organisation personnelle, prise d\'initiative et veille régulière sur les technologies front & backend.',
    tags: ['Autonomie', 'Veille', 'Curiosité']
  },
  {
    name: 'Orientation résultats',
    icon: 'mdi:target-variant',
    level: 'Impact mesurable',
    description:
      'Tests, retours utilisateurs et itérations pour livrer des fonctionnalités qui répondent à de vrais besoins.',
    tags: ['Résultats', 'Tests', 'Itération']
  }
];
</script>

<style scoped>
/* Background grid */
.skills-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(94, 223, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 223, 255, 0.03) 1px, transparent 1px);
  background-size: 70px 70px;
  mask-image: radial-gradient(ellipse at center, black 25%, transparent 70%);
}

/* Particles */
.skills-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #5EDFFF 0%, transparent 70%);
  border-radius: 9999px;
  animation: skillsFloat 9s ease-in-out infinite, skillsTwinkle 4s ease-in-out infinite;
}

@keyframes skillsFloat {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(18px, -24px);
  }
  50% {
    transform: translate(-12px, -18px);
  }
  75% {
    transform: translate(10px, -36px);
  }
}

@keyframes skillsTwinkle {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
}

/* Section title */
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

.skills-subtitle {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
}

.skills-section-description {
  max-width: 24rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
}

/* Grid / perspective */
.perspective-container {
  perspective: 1200px;
}

.skill-card-wrapper {
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: skillFadeIn 0.7s ease forwards;
}

@keyframes skillFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Skill card */
.skill-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
  padding: 1.8rem;
  background: radial-gradient(circle at top, rgba(94, 223, 255, 0.18) 0%, transparent 55%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  transition: all 0.35s ease;
}

.skill-card:hover {
  transform: translateY(-8px) scale(1.02) rotateX(4deg) rotateY(-3deg);
  border-color: rgba(94, 223, 255, 0.55);
  box-shadow:
    0 24px 50px rgba(0, 0, 0, 0.65),
    0 0 60px rgba(94, 223, 255, 0.2);
}

/* Glow & scan line */
.skill-card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(94, 223, 255, 0.2) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.skill-card:hover .skill-card-glow {
  opacity: 1;
}

.skill-scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(94, 223, 255, 0.7), transparent);
  opacity: 0;
}

.skill-card:hover .skill-scan-line {
  opacity: 0.6;
  animation: skillScan 2.5s ease-in-out infinite;
}

@keyframes skillScan {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}

/* Header */
.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
}

.skill-icon-ring {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  border: 1px solid rgba(94, 223, 255, 0.25);
  transition: all 0.3s ease;
}

.skill-card:hover .skill-icon-ring {
  border-color: rgba(94, 223, 255, 0.6);
  transform: rotate(35deg) scale(1.08);
  box-shadow: 0 0 18px rgba(94, 223, 255, 0.45);
}

.skill-icon-glow {
  position: absolute;
  inset: -8px;
  background: radial-gradient(circle, rgba(94, 223, 255, 0.22) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover .skill-icon-glow {
  opacity: 1;
}

.skill-meta {
  text-align: left;
}

.skill-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: white;
}

.skill-level {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.55);
}

/* Description & footer */
.skill-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

.skill-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skill-tag {
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid rgba(94, 223, 255, 0.28);
  background: rgba(3, 15, 30, 0.9);
  color: #5EDFFF;
}

/* Orbiting dots */
.skill-orbit {
  pointer-events: none;
  position: absolute;
  inset: -30%;
  border-radius: 9999px;
}

.orbit-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #5EDFFF;
  box-shadow: 0 0 12px rgba(94, 223, 255, 0.7);
}

.orbit-dot-1 {
  top: 8%;
  left: 20%;
  animation: orbit 9s linear infinite;
}

.orbit-dot-2 {
  bottom: 12%;
  right: 10%;
  animation: orbit 11s linear infinite reverse;
}

.orbit-dot-3 {
  top: 45%;
  right: 30%;
  animation: orbit 13s linear infinite;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(10px);
  }
  100% {
    transform: rotate(360deg) translateX(10px);
  }
}

@media (max-width: 767px) {
  .skill-card {
    padding: 1.5rem;
  }

  .skill-title {
    font-size: 1rem;
  }

  .skill-description {
    font-size: 0.85rem;
  }
}
</style>

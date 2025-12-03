<template>
  <section id="contact" class="relative overflow-hidden bg-[#020810] py-24">
    <!-- Animated Grid Background -->
    <div class="contact-grid"></div>
    
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

    <!-- Glowing Orbs -->
    <div class="absolute -left-40 top-1/3 w-80 h-80 bg-[#5EDFFF]/10 rounded-full blur-[120px] animate-pulse-slow"></div>
    <div class="absolute -right-40 bottom-1/4 w-64 h-64 bg-[#57F2CB]/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#5EDFFF]/5 border border-[#5EDFFF]/20 rounded-full">
          <span class="w-2 h-2 bg-[#57F2CB] rounded-full animate-pulse"></span>
          <span class="text-sm text-[#5EDFFF] font-mono">contact.init()</span>
        </div>
        
        <h2 class="section-title">
          <span class="text-white">Travaillons</span>
          <span class="text-[#5EDFFF]"> Ensemble</span>
        </h2>
        
        <p class="max-w-xl mx-auto mt-4 text-white/50 leading-relaxed">
          Une idée de projet ? Une collaboration ? N'hésitez pas à me contacter. 
          Je réponds généralement sous 24 heures.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 items-start">
        <!-- Contact Info -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Info Cards -->
          <div class="info-card group">
            <div class="info-icon">
              <Icon icon="mdi:email-outline" class="w-6 h-6" />
              <span class="icon-glow"></span>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Email</h4>
              <a href="mailto:stevyobame163@gmail.com" class="text-white/50 hover:text-[#5EDFFF] transition-colors">
                stevyobame163@gmail.com
              </a>
            </div>
          </div>

          <div class="info-card group">
            <div class="info-icon">
              <Icon icon="mdi:map-marker-outline" class="w-6 h-6" />
              <span class="icon-glow"></span>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Localisation</h4>
              <span class="text-white/50">Libreville, Gabon</span>
            </div>
          </div>

          <div class="info-card group">
            <div class="info-icon">
              <Icon icon="mdi:phone-outline" class="w-6 h-6" />
              <span class="icon-glow"></span>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Téléphone</h4>
              <a href="tel:+241060242022" class="text-white/50 hover:text-[#5EDFFF] transition-colors">
                +241 060 24 20 22
              </a>
            </div>
          </div>

          <div class="info-card group">
            <div class="info-icon">
              <Icon icon="mdi:clock-outline" class="w-6 h-6" />
              <span class="icon-glow"></span>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Disponibilité</h4>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-[#57F2CB] rounded-full animate-pulse"></span>
                <span class="text-[#57F2CB] text-sm">Ouvert aux nouvelles opportunités</span>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="pt-6 border-t border-white/10">
            <h4 class="text-white font-semibold mb-4">Me suivre</h4>
            <div class="flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="social-btn"
                :aria-label="social.name"
              >
                <Icon :icon="social.icon" class="w-5 h-5 relative z-10" />
                <span class="social-glow" :style="{ '--glow-color': social.color }"></span>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <form @submit.prevent="handleSubmit" class="form-container">
            <!-- Form Header -->
            <div class="form-header">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <span class="text-xs text-white/40 font-mono">nouveau-message.sh</span>
            </div>

            <!-- Form Fields -->
            <div class="p-6 space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="form-group">
                  <label for="name" class="form-label">
                    <Icon icon="mdi:account-outline" class="w-4 h-4" />
                    <span>Nom complet</span>
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Stevy OBAME"
                    class="form-input"
                    required
                  />
                  <span class="input-focus-line"></span>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">
                    <Icon icon="mdi:email-outline" class="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="stevyobame163@gmail.com"
                    class="form-input"
                    required
                  />
                  <span class="input-focus-line"></span>
                </div>
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">
                  <Icon icon="mdi:tag-outline" class="w-4 h-4" />
                  <span>Sujet</span>
                </label>
                <select
                  id="subject"
                  v-model="form.subject"
                  class="form-input form-select"
                  required
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  <option value="project">Nouveau projet</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="job">Opportunité d'emploi</option>
                  <option value="other">Autre</option>
                </select>
                <span class="input-focus-line"></span>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">
                  <Icon icon="mdi:message-outline" class="w-4 h-4" />
                  <span>Message</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="Décrivez votre projet ou votre demande..."
                  class="form-input form-textarea"
                  required
                ></textarea>
                <span class="input-focus-line"></span>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="submit-btn group"
                :disabled="isSubmitting"
              >
                <span class="btn-bg"></span>
                <span class="btn-shine"></span>
                <span class="relative z-10 flex items-center justify-center gap-2">
                  <Icon
                    :icon="isSubmitting ? 'mdi:loading' : 'mdi:send'"
                    class="w-5 h-5"
                    :class="{ 'animate-spin': isSubmitting }"
                  />
                  <span>{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}</span>
                </span>
              </button>

              <!-- Success Message -->
              <Transition name="fade">
                <div v-if="showSuccess" class="success-message">
                  <Icon icon="mdi:check-circle" class="w-5 h-5 text-[#57F2CB]" />
                  <span>Message envoyé avec succès ! Je vous répondrai rapidement.</span>
                </div>
              </Transition>

              <!-- Error Message -->
              <Transition name="fade">
                <div v-if="showError" class="error-message">
                  <Icon icon="mdi:alert-circle" class="w-5 h-5 text-red-400" />
                  <span>{{ errorMessage }}</span>
                </div>
              </Transition>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom Glow Line -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5EDFFF]/30 to-transparent"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const particles = Array.from({ length: 15 }, () => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  size: `${2 + Math.random() * 4}px`
}));

const socials = [
  { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com/ghos-spec', color: '#fff' },
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'Twitter', icon: 'mdi:twitter', url: 'https://twitter.com', color: '#1DA1F2' }
];

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const errorMessage = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  showSuccess.value = false;
  showError.value = false;
  errorMessage.value = '';

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      }
    });

    if (response.success) {
      showSuccess.value = true;
      
      // Reset form
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    }
  } catch (error: any) {
    console.error('Error submitting form:', error);
    errorMessage.value = error.data?.statusMessage || 'Une erreur s\'est produite. Veuillez réessayer.';
    showError.value = true;
    
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Grid Background */
.contact-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(94, 223, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 223, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 25s linear infinite;
}

@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
}

/* Scan Line */
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #5EDFFF, transparent);
  opacity: 0.2;
  animation: scanDown 5s ease-in-out infinite;
}

@keyframes scanDown {
  0%, 100% { top: 0; opacity: 0; }
  10% { opacity: 0.2; }
  90% { opacity: 0.2; }
  100% { top: 100%; opacity: 0; }
}

/* Particles */
.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, #5EDFFF 0%, transparent 70%);
  border-radius: 50%;
  animation: float 10s ease-in-out infinite, twinkle 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-15px) translateX(8px); }
  50% { transform: translateY(-8px) translateX(-8px); }
  75% { transform: translateY(-20px) translateX(4px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.6; }
}

/* Animations */
.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

.delay-1000 { animation-delay: 1s; }

/* Section Title */
.section-title {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
}

/* Info Cards */
.info-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(94, 223, 255, 0.05);
  border-color: rgba(94, 223, 255, 0.2);
  transform: translateX(5px);
}

.info-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(94, 223, 255, 0.1);
  border: 1px solid rgba(94, 223, 255, 0.2);
  border-radius: 12px;
  color: #5EDFFF;
  flex-shrink: 0;
}

.icon-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(94, 223, 255, 0.3) 0%, transparent 70%);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-card:hover .icon-glow {
  opacity: 1;
}

/* Social Buttons */
.social-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.6);
  overflow: hidden;
  transition: all 0.3s ease;
}

.social-btn:hover {
  color: white;
  border-color: rgba(94, 223, 255, 0.4);
  transform: translateY(-3px);
}

.social-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--glow-color), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-btn:hover .social-glow {
  opacity: 0.2;
}

/* Form Container */
.form-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* Form Group */
.form-group {
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  font-size: 0.9375rem;
  color: white;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-input:focus {
  background: rgba(94, 223, 255, 0.05);
  border-color: rgba(94, 223, 255, 0.4);
  box-shadow: 0 0 0 3px rgba(94, 223, 255, 0.1);
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%235EDFFF' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

.form-select option {
  background: #0a1628;
  color: white;
}

.form-textarea {
  resize: none;
  min-height: 140px;
}

.input-focus-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #5EDFFF, #57F2CB);
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.form-input:focus ~ .input-focus-line {
  width: 100%;
}

/* Submit Button */
.submit-btn {
  position: relative;
  width: 100%;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 600;
  color: #041028;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5EDFFF, #57F2CB);
  transition: transform 0.3s ease;
}

.submit-btn:not(:disabled):hover .btn-bg {
  transform: scale(1.02);
}

.btn-shine {
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

/* Success & Error Messages */
.success-message,
.error-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  font-size: 0.875rem;
}

.success-message {
  background: rgba(87, 242, 203, 0.1);
  border: 1px solid rgba(87, 242, 203, 0.3);
  color: #57F2CB;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-2xl p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2 text-center">Connexion Admin</h1>
        <p class="text-gray-600 text-center mb-8">Accédez à votre espace administrateur</p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Message d'erreur -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ error }}
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="votre@email.com"
            />
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Rediriger si déjà connecté
definePageMeta({
  layout: false
});

const { login } = useAuth();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  try {
    await login(email.value, password.value);
    // Rediriger vers la page admin après connexion réussie
    await navigateTo('/admin');
  } catch (err) {
    console.error('Erreur de connexion:', err);
    error.value = 'Email ou mot de passe incorrect';
  } finally {
    loading.value = false;
  }
};

// Vérifier si déjà connecté au montage du composant
onMounted(async () => {
  const { $firebase } = useNuxtApp();
  const auth = $firebase.auth;
  
  if (auth && auth.currentUser) {
    await navigateTo('/admin');
  }
});
</script>


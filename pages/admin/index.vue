<template>
  <div v-if="isLoading">Chargement...</div>
  <Admin v-else />
</template>   

<script setup>
import { onAuthStateChanged } from "firebase/auth";
definePageMeta({
  middleware: 'auth-admin'
})

const isLoading = ref(true);
const { $firebase } = useNuxtApp();

onMounted(() => {
  if (process.server) {
    isLoading.value = false;
    return;
  }

  const auth = $firebase?.auth;
  
  if (!auth) {
    navigateTo('/admin/login');
    return;
  }

  // Attendre que Firebase restaure la session
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigateTo('/admin/login');
    } else {
      isLoading.value = false;
    }
    unsubscribe();
  });

  // Timeout de sécurité
  setTimeout(() => {
    if (isLoading.value) {
      unsubscribe();
      isLoading.value = false;
    }
  }, 2000);
});
</script>
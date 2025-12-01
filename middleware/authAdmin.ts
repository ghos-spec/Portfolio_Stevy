export default defineNuxtRouteMiddleware((to, from) => {
  // Ne pas vérifier sur la page de login
  if (to.path === '/admin/login') {
    return;
  }

  // Ne vérifier que sur les routes /admin (pas sur / ou autres routes)
  if (!to.path.startsWith('/admin')) {
    return;
  }

  if (process.server) {
    // Sur le serveur, on laisse passer (vérification côté client)
    return;
  }

  // Sur le client, vérifier l'authentification
  const { $firebase } = useNuxtApp();
  
  if (!$firebase || !$firebase.auth) {
    return navigateTo("/admin/login");
  }

  const auth = $firebase.auth;
  
  // Vérifier si l'utilisateur est connecté
  if (!auth.currentUser) {
    return navigateTo("/admin/login");
  }
});

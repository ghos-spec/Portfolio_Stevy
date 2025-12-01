import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const { $firebase } = useNuxtApp();
  const auth = $firebase.auth;

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Vérifier si l'utilisateur est connecté (attendre que Firebase soit prêt)
  const checkAuth = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (process.server) {
        resolve(false);
        return;
      }

      if (!auth) {
        resolve(false);
        return;
      }

      // Si currentUser existe immédiatement, retourner true
      if (auth.currentUser) {
        resolve(true);
        return;
      }

      // Sinon, attendre le premier changement d'état
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(!!user);
      });
    });
  };

  return { login, logout, checkAuth };
};

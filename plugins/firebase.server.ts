export default defineNuxtPlugin(() => {
  const fallback = {
    app: null,
    auth: null,
    db: null,
    analytics: null,
    storage: null
  };

  return {
    provide: {
      firebase: fallback
    }
  };
});

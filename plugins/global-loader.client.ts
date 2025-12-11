export default defineNuxtPlugin((nuxtApp) => {
  const isLoading = useState<boolean>('global-loading', () => false);

  const start = () => {
    isLoading.value = true;
  };

  const stop = () => {
    isLoading.value = false;
  };

  nuxtApp.hook('page:start', () => {
    start();
  });

  nuxtApp.hook('page:finish', () => {
    stop();
  });

  nuxtApp.hook('app:error', () => {
    stop();
  });

  nuxtApp.hook('app:mounted', () => {
    stop();
  });
});

<template>
  <ClientOnly>
    <IconifyIcon :icon="icon" v-bind="$attrs" />
    <template #fallback>
      <span class="inline-block h-[1em] w-[1em]"></span>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  icon: string;
}>();
</script>

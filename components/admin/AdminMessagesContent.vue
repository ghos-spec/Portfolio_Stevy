<template>
  <section class="grid gap-6 lg:grid-cols-[320px_1fr]">
    <div class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 text-white shadow-lg shadow-black/20">
      <div class="flex items-center justify-between text-sm text-white/60">
        <p>
          Vous avez <span class="font-semibold text-white">{{ unreadCount }}</span> messages non lus
        </p>
        <button type="button" class="text-cyan-300 hover:text-cyan-200" @click="refresh">Rafraîchir</button>
      </div>

      <div v-if="loading" class="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-white/70">
        Chargement des messages...
      </div>
      <div v-else-if="error" class="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-center text-rose-300">
        {{ error }}
      </div>

      <div v-else>
        <ul v-if="messages.length" class="mt-6 space-y-3">
          <li v-for="message in messages" :key="message.id">
            <button
              type="button"
              class="w-full rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-left transition hover:border-cyan-400"
              :class="message.id === selectedId ? 'border-cyan-400 bg-[#0F213A]' : ''"
              @click="selectMessage(message.id)"
            >
              <p class="font-semibold">{{ message.sender }}</p>
              <p class="text-sm text-white/60">{{ message.subject }}</p>
            </button>
          </li>
        </ul>
        <p v-else class="mt-6 text-center text-white/60">Aucun message pour le moment.</p>
      </div>
    </div>

    <div class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 text-white shadow-lg shadow-black/20">
      <div v-if="!activeMessage" class="text-center text-white/60">Sélectionnez un message pour afficher les détails.</div>
      <template v-else>
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-2xl font-semibold">{{ activeMessage.subject }}</p>
          <p class="text-sm text-white/60">De : {{ activeMessage.sender }}</p>
        </div>
        <div class="flex items-center gap-2 self-end">
          <button type="button" class="rounded-full border border-white/10 p-2 hover:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
              <path d="M12 8v8" stroke-linecap="round" />
              <path d="M8 12h8" stroke-linecap="round" />
            </svg>
          </button>
          <button type="button" class="rounded-full border border-white/10 p-2 hover:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
              <path d="M3 6h18" stroke-linecap="round" />
              <path d="M8 6v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke-linecap="round" />
              <path d="m6 6 1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

        <div class="mt-6 space-y-4 text-white/70">
          <p class="font-semibold text-white">
            {{ activeMessage.email }}
          </p>
          <p>{{ activeMessage.date }}</p>
          <p class="text-white/80 whitespace-pre-line">{{ activeMessage.content }}</p>
        </div>

        <button class="mt-6 rounded-full bg-[#37BDF8] px-6 py-2 font-semibold text-[#04162A] transition hover:opacity-90">
          Répondre
        </button>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useMessagesData } from '~/composables/useMessagesData';

const { messages, loading, error, unreadCount, refresh } = useMessagesData();

const selectedId = ref(null);

watch(
  messages,
  (newMessages) => {
    if (!newMessages.length) {
      selectedId.value = null;
      return;
    }
    if (!selectedId.value || !newMessages.some((msg) => msg.id === selectedId.value)) {
      selectedId.value = newMessages[0].id;
    }
  },
  { immediate: true }
);

const activeMessage = computed(() => messages.value.find((msg) => msg.id === selectedId.value));

const selectMessage = (id) => {
  selectedId.value = id;
};
</script>

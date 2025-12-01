<template>
  <section class="space-y-6 text-white">
    <div v-if="loading" class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 text-center text-white/70">
      Chargement des paramètres...
    </div>

    <div v-else>
      <div v-if="error" class="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-200">
        {{ error }}
      </div>
      <div v-if="success" class="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-200">
        {{ success }}
      </div>

      <SettingCard title="Notifications">
        <template #icon>
          <svg class="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.353 20a2.647 2.647 0 0 0 5.294 0" />
            <path d="M18.579 16.5c-.506-.936-.83-2.32-.83-4.218 0-4.138-1.88-6.282-3.75-7.17a2 2 0 0 0-4 0c-1.87.888-3.75 3.032-3.75 7.17 0 1.897-.324 3.282-.83 4.218-.28.518-.42.777-.417.992.007.613.475 1.1 1.088 1.1h11.828c.613 0 1.081-.487 1.088-1.1.003-.215-.137-.474-.417-.992z" />
          </svg>
        </template>
        <ToggleRow
          v-for="notif in settings.notifications"
          :key="notif.key"
          v-model="notif.enabled"
          :label="notif.label"
          :description="notif.description"
        />
      </SettingCard>

      <SettingCard title="Confidentialité">
        <template #icon>
          <svg class="h-8 w-8 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3.75" y="10.5" width="16.5" height="10.5" rx="2.25" />
            <path d="M7.5 10.5v-2.25a4.5 4.5 0 0 1 9 0v2.25" />
            <path d="M12 14.25v2.25" />
          </svg>
        </template>
        <ToggleRow
          v-for="privacy in settings.privacy"
          :key="privacy.key"
          v-model="privacy.enabled"
          :label="privacy.label"
          :description="privacy.description"
        />
      </SettingCard>

      <SettingCard title="Affichage">
        <template #icon>
          <svg class="h-8 w-8 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2.25" y="3" width="19.5" height="13.5" rx="2.25" />
            <path d="M8.25 21h7.5" />
            <path d="M12 16.5V21" />
          </svg>
        </template>
        <div class="space-y-4">
          <div>
            <p class="text-sm font-semibold">Thème</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="option in themeOptions"
                :key="option"
                type="button"
                class="rounded-full px-4 py-2 text-sm"
                :class="option === settings.theme ? 'bg-cyan-500 text-[#04162A]' : 'bg-white/5 text-white/70'"
                @click="settings.theme = option"
              >
                {{ option }}
              </button>
            </div>
          </div>
          <ToggleRow v-model="settings.compact" label="Mode compact" description="Utiliser une interface plus compacte" />
        </div>
      </SettingCard>

      <div class="flex gap-3">
        <button
          type="button"
          class="rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition hover:border-cyan-400"
          :disabled="saving"
          @click="refresh"
        >
          Rafraîchir
        </button>
        <button
          type="button"
          class="rounded-full bg-[#37BDF8] px-6 py-3 font-semibold text-[#04162A] transition hover:opacity-90 disabled:opacity-50"
          :disabled="saving"
          @click="saveSettings"
        >
          {{ saving ? 'Sauvegarde…' : 'Enregistrer les paramètres' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineComponent, h } from 'vue';
import { useSettingsData } from '~/composables/useSettingsData';

const { settings, loading, saving, error, success, saveSettings, refresh } = useSettingsData();

const themeOptions = ['Dark', 'Light', 'Auto'];

const SettingCard = defineComponent({
  props: {
    icon: String,
    title: String
  },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'rounded-3xl border border-white/5 bg-[#0B1527] p-6 shadow-lg shadow-black/20' }, [
        h('div', { class: 'mb-4 flex items-center gap-3 text-lg font-semibold' }, [
          h('span', { class: 'text-2xl' }, props.icon),
          h('span', null, props.title)
        ]),
        slots.default ? slots.default() : null
      ]);
  }
});

const ToggleRow = defineComponent({
  props: {
    label: String,
    description: String,
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const toggle = () => emit('update:modelValue', !props.modelValue);

    return () =>
      h(
        'button',
        {
          type: 'button',
          class:
            'flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10',
          onClick: toggle
        },
        [
          h('span', null, [
            h('p', { class: 'font-semibold' }, props.label),
            h('p', { class: 'text-sm text-white/60' }, props.description)
          ]),
          h(
            'span',
            { class: 'flex h-6 w-6 items-center justify-center rounded-md border border-white/20', 'aria-hidden': 'true' },
            props.modelValue ? '✔️' : ''
          )
        ]
      );
  }
});
</script>

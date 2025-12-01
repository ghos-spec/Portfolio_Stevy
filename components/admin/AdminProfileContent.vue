<template>
  <section class="space-y-6 text-white">
    <div v-if="loading" class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 text-center text-white/70">
      Chargement du profil...
    </div>

    <div v-else>
      <div v-if="error" class="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-200">
        {{ error }}
      </div>
      <div v-if="success" class="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-200">
        {{ success }}
      </div>

      <form class="space-y-6" @submit.prevent="saveProfile">
        <div class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 shadow-lg shadow-black/20">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-semibold">
                {{ computedInitials }}
              </div>
              <div>
                <p class="text-2xl font-semibold">{{ profile.name || 'Nom du profil' }}</p>
                <p class="text-white/70">{{ profile.email || 'Adresse email' }}</p>
                <p class="text-sm text-white/60">{{ profile.location || 'Localisation' }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button type="button" class="rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/20" @click="refresh" :disabled="saving">
                Rafraîchir
              </button>
              <button type="submit" class="rounded-full bg-[#37BDF8] px-6 py-2 text-sm font-semibold text-[#04162A] transition hover:opacity-90 disabled:opacity-50" :disabled="saving">
                {{ saving ? 'Sauvegarde…' : 'Enregistrer' }}
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 shadow-lg shadow-black/20 space-y-6">
          <div class="grid gap-4 md:grid-cols-2">
            <ProfileInput label="Nom complet" v-model="profile.name" />
            <ProfileInput label="Email" type="email" v-model="profile.email" />
            <ProfileInput label="Téléphone" v-model="profile.phone" />
            <ProfileInput label="Localisation" v-model="profile.location" />
          </div>
          <div>
            <ProfileTextarea label="Bio" v-model="profile.bio" />
          </div>
        </div>

        <div class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 shadow-lg shadow-black/20">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Liens sociaux</h3>
            <button type="button" class="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-400" @click="addSocial">
              Ajouter un lien
            </button>
          </div>
          <div class="mt-4 space-y-4" v-if="profile.socials.length">
            <div v-for="(link, index) in profile.socials" :key="index" class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="flex flex-col gap-3 md:flex-row">
                <ProfileInput label="Label" v-model="link.label" class="flex-1" />
                <ProfileInput label="URL" v-model="link.url" class="flex-1" />
                <button type="button" class="self-start rounded-full border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:text-white" @click="removeSocial(index)">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
          <p v-else class="mt-4 text-sm text-white/60">Ajoutez vos liens sociaux pour que les visiteurs puissent vous contacter facilement.</p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, defineComponent, h } from 'vue';
import { useProfileData } from '~/composables/useProfileData';

const { profile, loading, saving, error, success, saveProfile, refresh } = useProfileData();

const computedInitials = computed(() => {
  if (profile.initials) return profile.initials;
  return profile.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('')
    : 'SM';
});

const addSocial = () => {
  profile.socials = [...profile.socials, { label: '', url: '' }];
};

const removeSocial = (index) => {
  profile.socials = profile.socials.filter((_, idx) => idx !== index);
};

const ProfileInput = defineComponent({
  props: {
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
    type: { type: String, default: 'text' }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h('label', { class: attrs.class || 'space-y-2 flex-1' }, [
        h('span', { class: 'text-sm font-semibold text-white' }, props.label),
        h('input', {
          class: 'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 placeholder:text-white/40 focus:border-cyan-400 focus:outline-none',
          value: props.modelValue,
          type: props.type,
          onInput: (event) => emit('update:modelValue', event.target.value)
        })
      ]);
  }
});

const ProfileTextarea = defineComponent({
  props: {
    label: { type: String, required: true },
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('label', { class: 'space-y-2 w-full' }, [
        h('span', { class: 'text-sm font-semibold text-white' }, props.label),
        h('textarea', {
          class: 'min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 placeholder:text-white/40 focus:border-cyan-400 focus:outline-none',
          value: props.modelValue,
          onInput: (event) => emit('update:modelValue', event.target.value)
        })
      ]);
  }
});
</script>

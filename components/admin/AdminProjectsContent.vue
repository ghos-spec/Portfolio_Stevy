<template>
  <section class="space-y-6">
    <div class="rounded-3xl border border-white/5 bg-[#0B1527] p-6 text-white shadow-lg shadow-black/20">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.4em] text-white/40">Gestion des projets</p>
          <h2 class="text-2xl font-semibold">Vos projets de portfolio</h2>
          <p class="text-sm text-white/60">Ajoutez, modifiez ou supprimez vos projets facilement.</p>
        </div>
        <button class="flex items-center gap-2 rounded-full bg-[#37BDF8] px-5 py-2 text-sm font-semibold text-[#04162A] transition hover:opacity-90" @click="openCreateModal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
            <path d="M12 5v14" stroke-linecap="round" />
            <path d="M5 12h14" stroke-linecap="round" />
          </svg>
          Ajouter un projet
        </button>
      </div>
    </div>

    <div class="overflow-hidden rounded-3xl border border-white/5 bg-[#0B1527] text-white shadow-lg shadow-black/20">
      <div class="flex flex-col gap-3 border-b border-white/5 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#061122] px-4 py-2 text-sm text-white/70">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-3.5-3.5" stroke-linecap="round" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Rechercher un projet..." class="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none" />
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in CATEGORY_OPTIONS"
            :key="category"
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-semibold transition"
            :class="isCategoryActive(category) ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-300' : 'border-white/10 bg-white/5 text-white/50 hover:text-white'"
            @click="() => toggleCategoryFilter(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
      <div v-if="error" class="border-b border-rose-500/30 bg-rose-500/10 px-6 py-3 text-sm text-rose-300">
        {{ error }}
      </div>
      <div v-if="loading" class="border-b border-white/5 bg-white/5 px-6 py-3 text-sm text-white/70">
        Chargement des projets...
      </div>
      <div class="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center px-6 py-4 text-sm text-white/50 lg:grid">
        <span>Projet</span>
        <span>Technos</span>
        <span>Statut</span>
        <span>Catégorie</span>
        <span>Liens</span>
        <span>Date</span>
        <span>Actions</span>
      </div>
      <ul class="divide-y divide-white/5">
        <li v-for="project in filteredProjects" :key="project.id" class="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] lg:items-center">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 overflow-hidden rounded-2xl bg-white/5 text-lg font-semibold shrink-0">
              <img
                v-if="project.imageUrl"
                :src="project.imageUrl"
                :alt="`Visuel du projet ${project.name}`"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="flex h-full w-full items-center justify-center">
                {{ project.initials }}
              </div>
            </div>
            <div>
              <p class="font-semibold">{{ project.name }}</p>
              <p class="text-sm text-white/60 project-description-snippet">{{ project.description }}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 lg:justify-center">
            <span v-for="tag in project.tags" :key="tag" class="rounded-full bg-white/5 px-3 py-1 text-xs">
              {{ tag }}
            </span>
          </div>

          <div class="flex items-center gap-2 lg:justify-center">
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="project.status === 'Publié' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'"
            >
              {{ project.status }}
            </span>
          </div>

          <p class="text-sm text-white/60 lg:text-center">{{ project.category }}</p>

          <div class="flex items-center gap-3 text-white/60 lg:justify-center">
            <button type="button" class="rounded-full border border-white/10 p-2 hover:text-white" @click="() => openEditModal(project)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
                <path d="M12 5v14" stroke-linecap="round" />
                <path d="M5 12h14" stroke-linecap="round" />
              </svg>
            </button>
            <button type="button" class="rounded-full border border-white/10 p-2 hover:text-white" @click="() => openLinks(project)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
                <path d="M10 14 21 3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21 3h-7" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21 3v7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <p class="text-sm text-white/60 lg:text-center">{{ project.date }}</p>

          <div class="flex items-center gap-2 lg:justify-end">
            <button type="button" class="rounded-full border border-white/10 p-2 hover:text-white" @click="() => openEditModal(project)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
                <path d="M12 20h9" stroke-linecap="round" />
                <path d="M16.5 3.5 20.5 7.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 21v-7l12.5-12.5 4 4L8 18H4z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button type="button" class="rounded-full border border-white/10 p-2 hover:text-white" @click="() => confirmDelete(project)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
                <path d="M3 6h18" stroke-linecap="round" />
                <path d="M8 6v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke-linecap="round" />
                <path d="m6 6 1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <transition name="modal-fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
        <div class="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#08162c] text-white shadow-2xl">
          <header class="flex items-start justify-between border-b border-white/5 px-6 py-4">
            <div>
              <p class="text-xs uppercase tracking-[0.4em] text-white/40">{{ isEditMode ? 'Édition' : 'Nouveau projet' }}</p>
              <h3 class="text-2xl font-semibold">{{ isEditMode ? 'Modifier le projet' : 'Ajouter un projet' }}</h3>
            </div>
            <button class="rounded-full p-2 text-white/60 transition hover:bg-white/5 hover:text-white" @click="closeModal">
              <svg viewBox="0 0 24 24" class="h-5 w-5">
                <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </header>

          <form class="max-h-[75vh] space-y-5 overflow-y-auto px-6 py-5" @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="space-y-2 text-sm font-semibold text-white/80">
                <span>Titre du projet *</span>
                <input v-model="form.name" type="text" placeholder="Nom du projet" class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none" />
              </label>
              <label class="space-y-2 text-sm font-semibold text-white/80">
                <span>Statut</span>
                <div class="flex gap-3">
                  <button
                    type="button"
                    :class="[
                      'flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400',
                      form.status === 'Publié'
                        ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                    ]"
                    @click="() => setStatus('Publié')"
                  >
                    Publié
                  </button>
                  <button
                    type="button"
                    :class="[
                      'flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400',
                      form.status === 'Brouillon'
                        ? 'border-amber-400/70 bg-amber-500/15 text-amber-200'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                    ]"
                    @click="() => setStatus('Brouillon')"
                  >
                    Brouillon
                  </button>
                </div>
              </label>
            </div>

            <label class="space-y-2 text-sm font-semibold text-white/80">
              <span>Slug (URL du projet)</span>
              <input
                v-model="form.slug"
                type="text"
                placeholder="site-vitrine-agence-marketing"
                class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
              />
              <span class="block text-[11px] text-white/40">Optionnel : si vide, un slug sera généré automatiquement à partir du titre.</span>
            </label>

            <label class="space-y-2 text-sm font-semibold text-white/80">
              <span>Catégorie</span>
              <select v-model="form.category" class="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none">
                <option v-for="category in CATEGORY_OPTIONS" :key="category" :value="category" class="bg-[#0B1527] text-white">
                  {{ category }}
                </option>
              </select>
            </label>

            <label class="space-y-2 text-sm font-semibold text-white/80">
              <span>Description *</span>
              <textarea v-model="form.description" rows="3" placeholder="Décrivez votre projet" class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"></textarea>
            </label>

            <div class="space-y-3">
              <label class="text-sm font-semibold text-white/80">Technologies / Tags</label>
              <div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
                <input v-model="tagInput" type="text" placeholder="Ajouter un tag (ex: Nuxt, Firebase)" class="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none" @keyup.enter.prevent="addTag" />
                <button type="button" class="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500 text-[#04162A]" @click="addTag">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14" stroke-linecap="round" />
                    <path d="M5 12h14" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
              <div v-if="form.tags.length" class="flex flex-wrap gap-2">
                <span v-for="tag in form.tags" :key="tag" class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                  {{ tag }}
                  <button type="button" class="text-white/60 hover:text-white" @click="() => removeTag(tag)">
                    ×
                  </button>
                </span>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="space-y-2 text-sm font-semibold text-white/80">
                <span>Lien GitHub</span>
                <input v-model="form.githubUrl" type="url" placeholder="https://github.com/..." class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none" />
              </label>
              <label class="space-y-2 text-sm font-semibold text-white/80">
                <span>Démo en ligne</span>
                <input v-model="form.liveUrl" type="url" placeholder="https://votre-demo.com" class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none" />
              </label>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2 text-sm font-semibold text-white/80">
                <span>Visuel du projet</span>
                <div class="rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-center transition-colors duration-200 hover:border-cyan-400/60">
                  <input ref="imageInput" type="file" accept="image/*" class="hidden" @change="(event) => handleFileChange('image', event)" />
                  <button type="button" class="flex w-full flex-col items-center gap-2 rounded-2xl border border-transparent px-3 py-2 text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-white cursor-pointer" @click="() => triggerFile('image')">
                    <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M12 5v14" stroke-linecap="round" />
                      <path d="M5 12h14" stroke-linecap="round" />
                    </svg>
                    <span v-if="!form.imagePreview" class="text-xs">Cliquez pour ajouter une image</span>
                    <span v-else class="text-xs text-white">Image prête à être envoyée</span>
                  </button>
                  <p v-if="form.imagePreview" class="mt-3 text-xs text-white/60">Prévisualisation :
                    <img :src="form.imagePreview" alt="Prévisualisation image" class="mt-2 h-28 w-full rounded-xl object-cover" />
                  </p>
                </div>
              </div>
              <div class="space-y-2 text-sm font-semibold text-white/80">
                <span>Vidéo de démo (optionnel)</span>
                <div class="rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-center transition-colors duration-200 hover:border-cyan-400/60">
                  <input ref="videoInput" type="file" accept="video/*" class="hidden" @change="(event) => handleFileChange('video', event)" />
                  <button type="button" class="flex w-full flex-col items-center gap-2 rounded-2xl border border-transparent px-3 py-2 text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-white cursor-pointer" @click="() => triggerFile('video')">
                    <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M8 5v14l11-7z" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span v-if="!form.videoPreview" class="text-xs">Cliquez pour ajouter une vidéo</span>
                    <span v-else class="text-xs text-white">Vidéo prête à être envoyée</span>
                  </button>
                </div>
              </div>
            </div>

            <p v-if="formError" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">{{ formError }}</p>

            <div class="flex flex-col gap-3 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" class="rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition hover:text-white" @click="closeModal">
                Annuler
              </button>
              <button type="submit" :disabled="isSubmitting || !canSubmit" class="flex items-center gap-2 rounded-2xl bg-[#37BDF8] px-6 py-3 text-sm font-semibold text-[#04162A] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg v-if="isSubmitting" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke-linecap="round" />
                </svg>
                {{ isEditMode ? 'Enregistrer les modifications' : 'Créer le projet' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
        <div class="w-full max-w-md space-y-4 rounded-3xl border border-white/10 bg-[#09172c] p-6 text-white">
          <h4 class="text-xl font-semibold">Confirmer la suppression</h4>
          <p class="text-sm text-white/70">
            Êtes-vous sûr de vouloir supprimer le projet <strong>{{ projectPendingDelete?.name }}</strong> ? Cette action est irréversible.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" class="rounded-2xl border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:text-white" @click="cancelDelete">
              Annuler
            </button>
            <button type="button" class="rounded-2xl bg-rose-500/80 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-500" @click="performDelete">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue';
import { useProjectsData, type ProjectRecord } from '~/composables/useProjectsData';

const { projects, loading, error, createProject, updateProject, deleteProject } = useProjectsData();

const CATEGORY_OPTIONS = ['Développement Web', 'Développement Mobile', 'Webdesign', 'Design Graphique', 'Audiovisuel'];

const showModal = ref(false);
const isSubmitting = ref(false);
const formError = ref('');
const tagInput = ref('');
const imageInput = ref<HTMLInputElement | null>(null);
const videoInput = ref<HTMLInputElement | null>(null);
const currentProjectId = ref<string | null>(null);
const projectPendingDelete = ref<ProjectRecord | null>(null);
const showDeleteConfirm = ref(false);
const searchQuery = ref('');
const activeCategories = ref<string[]>([]);
const imageObjectUrl = ref<string | null>(null);
const videoObjectUrl = ref<string | null>(null);

const form = reactive({
  name: '',
  slug: '',
  description: '',
  tags: [] as string[],
  category: 'Développement Web',
  githubUrl: '',
  liveUrl: '',
  status: 'Brouillon',
  imageFile: null as File | null,
  videoFile: null as File | null,
  imagePreview: '',
  videoPreview: ''
});

const isEditMode = computed(() => !!currentProjectId.value);
const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return projects.value.filter((project) => {
    const matchesSearch =
      !query ||
      [project.name, project.description, project.category]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(query));
    const matchesCategory =
      activeCategories.value.length === 0 || activeCategories.value.includes(project.category || 'Développement Web');
    return matchesSearch && matchesCategory;
  });
});

const toggleCategoryFilter = (category: string) => {
  if (activeCategories.value.includes(category)) {
    activeCategories.value = activeCategories.value.filter((item) => item !== category);
  } else {
    activeCategories.value = [...activeCategories.value, category];
  }
};

const isCategoryActive = (category: string) => activeCategories.value.includes(category);

const revokeImageObjectUrl = () => {
  if (imageObjectUrl.value) {
    URL.revokeObjectURL(imageObjectUrl.value);
    imageObjectUrl.value = null;
  }
};

const revokeVideoObjectUrl = () => {
  if (videoObjectUrl.value) {
    URL.revokeObjectURL(videoObjectUrl.value);
    videoObjectUrl.value = null;
  }
};

const openCreateModal = () => {
  currentProjectId.value = null;
  resetForm();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  form.name = '';
  form.slug = '';
  form.description = '';
  form.tags = [];
  form.category = 'Développement Web';
  form.githubUrl = '';
  form.liveUrl = '';
  form.status = 'Brouillon';
  form.imageFile = null;
  form.videoFile = null;
  form.imagePreview = '';
  form.videoPreview = '';
  tagInput.value = '';
  formError.value = '';
  revokeImageObjectUrl();
  revokeVideoObjectUrl();
  imageInput.value && (imageInput.value.value = '');
  videoInput.value && (videoInput.value.value = '');
};

const addTag = () => {
  const tag = tagInput.value.trim();
  if (!tag || form.tags.includes(tag)) return;
  form.tags.push(tag);
  tagInput.value = '';
};

const removeTag = (tag: string) => {
  form.tags = form.tags.filter((item) => item !== tag);
};

const setStatus = (status: 'Publié' | 'Brouillon') => {
  form.status = status;
};

const triggerFile = (type: 'image' | 'video') => {
  if (type === 'image') {
    imageInput.value?.click();
  } else {
    videoInput.value?.click();
  }
};

const handleFileChange = (type: 'image' | 'video', event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  if (type === 'image') {
    revokeImageObjectUrl();
    form.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      imageObjectUrl.value && URL.revokeObjectURL(imageObjectUrl.value);
      imageObjectUrl.value = null;
      form.imagePreview = typeof reader.result === 'string' ? reader.result : '';
    };
    reader.readAsDataURL(file);
  } else {
    revokeVideoObjectUrl();
    form.videoFile = file;
    const previewUrl = URL.createObjectURL(file);
    videoObjectUrl.value = previewUrl;
    form.videoPreview = previewUrl;
  }
};

const canSubmit = computed(() => form.name.trim().length > 2 && form.description.trim().length > 10);

const handleSubmit = async () => {
  if (!canSubmit.value) {
    formError.value = 'Merci de renseigner au minimum le titre et la description du projet.';
    return;
  }

  formError.value = '';
  isSubmitting.value = true;

  try {
    if (isEditMode.value && currentProjectId.value) {
      await updateProject(currentProjectId.value, {
        name: form.name,
        slug: form.slug || undefined,
        description: form.description,
        tags: form.tags,
        category: form.category,
        status: form.status,
        githubUrl: form.githubUrl,
        liveUrl: form.liveUrl,
        imageUrl: form.imageFile ? undefined : form.imagePreview,
        videoUrl: form.videoFile ? undefined : form.videoPreview,
        imageFile: form.imageFile ?? undefined,
        videoFile: form.videoFile ?? undefined
      });
    } else {
      await createProject({
        name: form.name,
        slug: form.slug || undefined,
        description: form.description,
        tags: form.tags,
        category: form.category,
        status: form.status,
        githubUrl: form.githubUrl,
        liveUrl: form.liveUrl,
        imageFile: form.imageFile ?? undefined,
        videoFile: form.videoFile ?? undefined,
        date: new Date()
      });
    }
    closeModal();
  } catch (err) {
    console.error(err);
    formError.value = "Impossible de créer le projet pour le moment.";
  } finally {
    isSubmitting.value = false;
  }
};

const openEditModal = (project: ProjectRecord) => {
  currentProjectId.value = project.id;
  form.name = project.name;
  form.slug = project.slug || '';
  form.description = project.description;
  form.tags = [...project.tags];
  form.category = project.category || 'Développement Web';
  form.githubUrl = project.githubUrl || '';
  form.liveUrl = project.liveUrl || '';
  form.status = project.status;
  revokeImageObjectUrl();
  revokeVideoObjectUrl();
  form.imagePreview = project.imageUrl || '';
  form.videoPreview = project.videoUrl || '';
  form.imageFile = null;
  form.videoFile = null;
  showModal.value = true;
};

const openLinks = (project: ProjectRecord) => {
  console.log('Open links for project', project.id);
};

const confirmDelete = (project: ProjectRecord) => {
  projectPendingDelete.value = project;
  showDeleteConfirm.value = true;
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  projectPendingDelete.value = null;
};

const performDelete = async () => {
  if (!projectPendingDelete.value) return;
  await deleteProject(projectPendingDelete.value.id);
  cancelDelete();
};

onBeforeUnmount(() => {
  revokeImageObjectUrl();
  revokeVideoObjectUrl();
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.project-description-snippet {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>

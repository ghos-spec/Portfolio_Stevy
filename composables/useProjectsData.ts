import { ref } from 'vue';

export type ProjectRecord = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  status: string;
  date: string;
  initials: string;
  slug: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
};

export type ProjectPayload = {
  name: string;
  description: string;
  tags?: string[];
  category?: string;
  status?: string;
  date?: Date | string;
  initials?: string;
  slug?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  imageFile?: File | null;
  videoFile?: File | null;
};

const formatInitials = (name?: string) => {
  if (!name) return 'PR';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

const normalizeTags = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0);
      }
    } catch {
      return trimmed
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    return [];
  }

  return [];
};

const formatDateLabel = (value?: Date | string) => {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const mapProjectDoc = (entry: any): ProjectRecord => {
  const snapshotData = typeof entry?.data === 'function' ? entry.data() : entry?.data;
  const data = snapshotData ?? entry;
  const rawDate = data.date?.toDate?.() ?? data.date;
  return {
    id: entry.id ?? data.id ?? crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
    name: data.name ?? 'Projet sans nom',
    description: data.description ?? '',
    tags: normalizeTags(data.tags),
    category: data.category ?? 'Développement Web',
    status: data.status ?? 'Brouillon',
    date: rawDate ? formatDateLabel(rawDate) : '',
    initials: data.initials ?? formatInitials(data.name),
    slug: data.slug ?? '',
    githubUrl: data.githubUrl ?? '',
    liveUrl: data.liveUrl ?? '',
    imageUrl: data.imageUrl ?? '',
    videoUrl: data.videoUrl ?? ''
  };
};

export const mapProjectsResponse = (entries: any[]): ProjectRecord[] => {
  if (!Array.isArray(entries)) return [];
  return entries.map(mapProjectDoc);
};

type UseProjectsOptions = {
  initialProjects?: ProjectRecord[];
  autoFetch?: boolean;
};

export const useProjectsData = (options: UseProjectsOptions = {}) => {
  const projects = ref<ProjectRecord[]>(options.initialProjects ?? []);
  const loading = ref(false);
  const error = ref('');

  const fetchProjects = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await $fetch<any[]>('/api/projects');
      projects.value = mapProjectsResponse(response);
    } catch (err) {
      console.error('fetchProjects error', err);
      error.value = 'Impossible de charger les projets.';
    } finally {
      loading.value = false;
    }
  };

  const createProject = async (payload: ProjectPayload) => {
    loading.value = true;
    error.value = '';

    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('description', payload.description);
      formData.append('tags', JSON.stringify(payload.tags ?? []));
      formData.append('category', payload.category ?? 'Développement Web');
      formData.append('status', payload.status ?? 'Brouillon');
      formData.append('slug', payload.slug ?? '');
      formData.append('githubUrl', payload.githubUrl ?? '');
      formData.append('liveUrl', payload.liveUrl ?? '');

      if (payload.imageFile) {
        formData.append('image', payload.imageFile);
      }
      if (payload.videoFile) {
        formData.append('video', payload.videoFile);
      }

      await $fetch('/api/projects', {
        method: 'POST',
        body: formData
      });

      await fetchProjects();
    } catch (err) {
      console.error('createProject error', err);
      error.value = 'Impossible de créer le projet.';
    } finally {
      loading.value = false;
    }
  };

  const updateProject = async (id: string, updates: Partial<ProjectPayload>) => {
    loading.value = true;
    error.value = '';

    try {
      const formData = new FormData();
      
      if (updates.name !== undefined) formData.append('name', updates.name);
      if (updates.description !== undefined) formData.append('description', updates.description);
      if (updates.tags !== undefined) formData.append('tags', JSON.stringify(updates.tags));
      if (updates.category !== undefined) formData.append('category', updates.category);
      if (updates.status !== undefined) formData.append('status', updates.status);
      if (updates.githubUrl !== undefined) formData.append('githubUrl', updates.githubUrl);
      if (updates.liveUrl !== undefined) formData.append('liveUrl', updates.liveUrl);
      if (updates.slug !== undefined) formData.append('slug', updates.slug);

      if (updates.imageFile) {
        formData.append('image', updates.imageFile);
      }
      if (updates.videoFile) {
        formData.append('video', updates.videoFile);
      }

      await $fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: formData
      });

      await fetchProjects();
    } catch (err) {
      console.error('updateProject error', err);
      error.value = 'Impossible de mettre à jour le projet.';
    } finally {
      loading.value = false;
    }
  };

  const deleteProject = async (id: string) => {
    await $fetch(`/api/projects/${id}`, { method: 'DELETE' });
    await fetchProjects();
  };

  if (process.client && (options.autoFetch ?? true) && projects.value.length === 0) {
    fetchProjects();
  }

  return {
    projects,
    loading,
    error,
    refresh: fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export const getSupabaseServerClient = () => {
  if (cachedClient) return cachedClient;

  const config = useRuntimeConfig();
  const url = config.supabase?.url;
  const serviceRoleKey = config.supabase?.serviceRoleKey;

  if (!url || !serviceRoleKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase configuration missing' });
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });

  return cachedClient;
};

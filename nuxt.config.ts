const requiredClientEnv = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
] as const;

const requiredServerEnv = [
  'FIREBASE_ADMIN_PROJECT_ID',
  'FIREBASE_ADMIN_CLIENT_EMAIL',
  'FIREBASE_ADMIN_PRIVATE_KEY',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
] as const;

const reportMissingEnv = (keys: readonly string[], scope: string) => {
  const missing = keys.filter((key) => !process.env[key] || process.env[key]?.length === 0);
  if (missing.length) {
    console.warn(`⚠️  [nuxt.config] Variables ${scope} manquantes: ${missing.join(', ')}`);
  }
};

reportMissingEnv(requiredClientEnv, 'client');
reportMissingEnv(requiredServerEnv, 'serveur');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  build: {
    transpile: ['@supabase/supabase-js']
  },

  css: ['@/assets/css/main.css'],

  // nuxt.config.ts
  plugins: [
    { src: '~/plugins/firebase.js', mode: 'client' }
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    firebaseAdmin: {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },

    supabase: {
      url: process.env.SUPABASE_URL,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      bucket: process.env.SUPABASE_STORAGE_BUCKET || 'projects-media'
    },

    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,   // ← utiliser FIREBASE_PROJECT_ID pour le client
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,

      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    },
  },

  image: {
    domains: supabaseHostname ? [supabaseHostname] : [],
    format: ['webp', 'jpeg', 'png']
  },

  modules: ['@nuxt/image', '@nuxt/fonts', '@nuxtjs/sitemap', 'nuxt-gtag'],

  gtag: {
    id: 'G-DFCHVRESRD'
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://portfolio-stevy.vercel.app',
    name: 'Stevy OBAME - Développeur Web & Designer Graphique'
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/projects'
    ],
    exclude: [
      '/admin',
      '/admin/**'
    ]
  },

  fonts: {
    families: [
      {
        name: 'Space Grotesk',
        provider: 'google',
        weights: [400, 500, 600, 700]
      },
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700]
      }
    ],
    defaults: {
      preload: true
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        {
          name: 'google-site-verification',
          content: 'sHk_h2jalbnGkyQ81fJ_AG0IcjCsVxThQ7wcAqIOBq0'
        }
      ],
      link: [
        // {
        //   rel: 'icon',
        //   type: 'image/jpeg',
        //   href: '/logo/SO.jpg'
        // },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  nitro: {
    compressPublicAssets: true
  }
})
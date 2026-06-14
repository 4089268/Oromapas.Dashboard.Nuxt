// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    db: {
      host:      process.env.DB_HOST      ?? '',
      port:      parseInt(process.env.DB_PORT ?? '1433'),
      database:  process.env.DB_NAME      ?? '',
      user:      process.env.DB_USER      ?? '',
      password:  process.env.DB_PASSWORD  ?? '',
      encrypt:   process.env.DB_ENCRYPT   === 'true',
      trustCert: process.env.DB_TRUST_CERT === 'true',
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-15',

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  app: {
    head: {
      title: 'OROMAPAS — Panel de Control',
      meta: [
        { name: 'description', content: 'Panel de administración OROMAPAS — Organismo Municipal de Agua Potable' }
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})

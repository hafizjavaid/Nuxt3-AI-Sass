// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
  ],
  build: {
    transpile: ['primevue']
  },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  supabase: {
    redirectOptions: {
      login: '/auth',
      callback: '/confirm',
      // Add URLS which don't require any Authentication like landing page
      exclude: ['/'],
    },
  },
})
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  supabase: {
    redirectOptions: {
      login: '/auth',
      callback: '/confirm',
      // Add URLS which don't require any Authentication like landing page
      exclude: ['/'],
    },
  },
  components: [
    {
      path: '~/components/ui',
      extensions: ['.vue'],
      pathPrefix: false
    },
    {
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false
    },
  ],
})
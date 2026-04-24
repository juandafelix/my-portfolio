export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirect: false
  },
  tailwindcss: {
    cssPath: false
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-04-24'
})

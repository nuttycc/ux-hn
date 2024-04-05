// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],
  tailwindcss: {
    editorSupport: true
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})
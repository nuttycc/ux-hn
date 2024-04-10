// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxtjs/google-fonts', '@nuxt/ui', '@nuxt/eslint'],
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    editorSupport: true
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      Inter: '200..700',
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700'
      }
    }
  }
})

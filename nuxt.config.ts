// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
      '~/assets/css/main.css',
      'vue-final-modal/style.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo-loader', '@nuxtjs/google-fonts', 'nuxt-swiper'],
  svgoLoader: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              convertColors: {
                currentColor: true,
              },
              removeViewBox: false,
            },
          },
        },
      ],
    }
  },
  googleFonts: {
    families: {
      'Source Sans Pro': [300, 400, 600, 700, 800]
    }
  },
  plugins: [
      '~/plugins/pinia.ts',
      '~/plugins/vue-final-modal.ts',
      '~/plugins/maska.ts'
  ],
  router: {
    base: '/Contact-Management/'
  },
  server: {
    host: '0.0.0.0', // Позволяет доступ с внешнего интерфейса
    port: 3000 // Убедитесь, что порт совпадает с тем, что вы используете
  }

})
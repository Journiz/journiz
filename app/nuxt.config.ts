// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: [
        '@journiz/nuxt-common'
    ],
    modules: [
        '@nuxtjs/ionic',
        'nuxt-windicss',
    ],
    ssr: false,
    devServer: {
        port: 4000
    },

    runtimeConfig: {
        public: {
            apiUrl: 'https://dev.journiz.leoboyer.dev'
        }
    }
})

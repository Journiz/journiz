// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/ionic',
        'nuxt-windicss',
    ],
    ssr: false,
    devServer: {
        port: 4000
    }
})

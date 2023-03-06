import PocketBase from 'pocketbase'

export default defineNuxtPlugin((nuxtApp => {
    const { apiUrl } = useRuntimeConfig().public
    const pb = new PocketBase(apiUrl)
    nuxtApp.provide('pb', pb)
}))
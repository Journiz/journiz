// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type InjectionType<A extends Plugin> = A extends Plugin<infer T> ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxtjs+ionic@0.8.1/node_modules/@nuxtjs/ionic/dist/runtime/router").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@pinia+nuxt@0.4.7_typescript@4.9.5/node_modules/@pinia/nuxt/dist/runtime/plugin.vue3").default> &
  InjectionType<typeof import("../components.plugin").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.2.3_typescript@4.9.5/node_modules/nuxt/dist/head/runtime/lib/vueuse-head.plugin").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.2.3_typescript@4.9.5/node_modules/nuxt/dist/pages/runtime/plugins/prefetch.client").default> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxtjs+ionic@0.8.1/node_modules/@nuxtjs/ionic/dist/runtime/ionic").default> &
  InjectionType<typeof import("../../plugins/capacitorSetup").default> &
  InjectionType<typeof import("../../../packages/nuxt-common/plugins/pocketbase").default>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }

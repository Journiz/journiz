import { NuxtModule } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["pwa"]?: typeof import("@kevinmarrec/nuxt-pwa").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["ionic"]?: typeof import("@nuxtjs/ionic").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["windicss"]?: typeof import("nuxt-windicss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["nuxt-config-schema"]?: typeof import("nuxt-config-schema").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", NuxtConfig["pinia"]] | ["@kevinmarrec/nuxt-pwa", NuxtConfig["pwa"]] | ["@nuxtjs/ionic", NuxtConfig["ionic"]] | ["nuxt-windicss", NuxtConfig["windicss"]] | ["nuxt-config-schema", NuxtConfig["nuxt-config-schema"]] | ["@nuxt/telemetry", NuxtConfig["telemetry"]])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },
  }
  interface PublicRuntimeConfig {
   apiUrl: string,

   pwaManifest: {
      name: string,

      short_name: any,

      description: any,

      lang: string,

      start_url: string,

      display: string,

      background_color: string,

      theme_color: string,

      icons: Array<any>,
   },
  }
}
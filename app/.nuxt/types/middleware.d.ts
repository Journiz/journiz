import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/ponk/gobelins/journiz/journiz/node_modules/.pnpm/nuxt@3.2.3_typescript@4.9.5/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
import { InjectionKey } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export interface TabData {
  name: string
  title: string
  icon?: string
  iconActive?: string
  isButtonOnly?: boolean
  to?: RouteLocationRaw
}
export type TabsProvider = {
  activeTabName: string
  activeTab?: TabData
  tabs: TabData[]
}

export const TabsProviderKey: InjectionKey<TabsProvider> =
  Symbol('tabsProvider')

import { InjectionKey } from 'vue'

export interface TabData {
  name: string
  title: string
  icon?: string
}
export type TabsProvider = {
  activeTabName: string
  activeTab?: TabData
  tabs: TabData[]
}

export const TabsProviderKey: InjectionKey<TabsProvider> =
  Symbol('tabsProvider')

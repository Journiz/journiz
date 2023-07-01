import { inject, InjectionKey } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export interface TabData {
  name: string
  title: string
  icon?: string
  iconActive?: string
  isButtonOnly?: boolean
  to?: RouteLocationRaw
  badge?: number
}
export type TabsProvider = {
  activeTabName: string
  activeTab?: TabData
  tabs: TabData[]
}

export type SetTabBadge = (tabName: string, badge: number) => void
export type SetBadge = (badge: number) => void

export const TabsProviderKey: InjectionKey<TabsProvider> =
  Symbol('tabsProvider')
export const SetTabBadgeKey: InjectionKey<SetTabBadge> = Symbol('setTabBadge')
export const SetBadgeKey: InjectionKey<SetBadge> = Symbol('setBadge')

export const useTabBadge = () => {
  return inject(SetBadgeKey)
}

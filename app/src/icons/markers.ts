import { Component } from 'vue'
import IconCurrent from '~icons/markers/current'
import IconBasic from '~icons/markers/basic'
import IconSecondary from '~icons/markers/secondary'
import IconSearched from '~icons/markers/searched'
export const markers: { [key: string]: Component } = {
  basecamp: IconCurrent,
  basic: IconBasic,
  secondary: IconSecondary,
  searched: IconSearched,
}
export default markers

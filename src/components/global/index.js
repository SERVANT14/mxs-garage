import DatePicker from './date-picker'
import Spinner from './spinner'

export function register (Vue) {
  Vue.component('mg-date-picker', DatePicker)
  Vue.component('mg-spinner', Spinner)
}

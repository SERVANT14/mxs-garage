import formatDate from 'date-fns/format'

export class DateHelper {
  static formatForPicker (date) {
    return formatDate(date, 'YYYY-MM-DD')
  }
}

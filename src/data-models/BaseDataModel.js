import _ from 'lodash'
import parseDate from 'date-fns/parse'

export class BaseDataModel {
  constructor (data) {
    this._hydrate(data)
  }

  /**
   * Gives you the list of fields and their types.
   *
   * @returns {{}}
   */
  getFields () {
    return {}
  }

  /**
   * Get this model's data without the id field.
   *
   * @returns {Object}
   */
  getDataWithoutId () {
    return _.omit(_.toPlainObject(this), '_id')
  }

  /**
   * Hydrates the model.
   *
   * @param data
   * @private
   */
  _hydrate (data) {
    _.forEach(this.getFields(), (type, name) => {
      let value = null

      if (_.has(data, name)) {
        value = BaseDataModel._castToType(data[name], type)
      }

      this[name] = value
    })
  }

  /**
   * Casts a given bit of data to the given type, if recognized.
   *
   * @param data
   * @param type
   *
   * @returns {*}
   *
   * @private
   */
  static _castToType (data, type) {
    if (type === Number) {
      return Number(data)
    } else if (type === String) {
      return String(data)
    } else if (type === Date) {
      return parseDate(data)
    } else if (type === Array) {
      return _.toArray(data)
    }

    return data
  }
}

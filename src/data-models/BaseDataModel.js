import _ from 'lodash'
import parseDate from 'date-fns/parse'

export class BaseDataModel {
  constructor (data) {
    this._hydrate(data)
  }

  /**
   * Gives you the value of the key field for this model.
   *
   * @returns {*}
   */
  getKey () {
    return _.has(this, '_id') ? this._id : null
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
   * Gives you the list of relationship fields and their types.
   *
   * @returns {{}}
   */
  getRelationshipFields () {
    return {}
  }

  /**
   * Get this model's data without the id field.
   *
   * @returns {Object}
   */
  getDataWithoutIdOrRelationships () {
    return _.omit(
      _.toPlainObject(this),
      ['_id', ..._.keys(this.getRelationshipFields())]
    )
  }

  /**
   * Populate model relationships.
   *
   * @returns {Promise.<BaseDataModel>}
   */
  populateRelationships () {
    return Promise.resolve(this)
  }

  /**
   * Hydrates the model.
   *
   * @param data
   * @private
   */
  _hydrate (data) {
    _.forEach(this.getFields(), (type, name) => {
      this[name] = _.has(data, name)
        ? BaseDataModel._castToType(data[name], type)
        : null
    })

    _.forEach(this.getRelationshipFields(), (type, name) => {
      this[name] = _.has(data, name) ? data[name] : null
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

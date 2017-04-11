import _ from 'lodash'
import { TrackCategory } from '../data-models/TrackCategory'

export class TrackCategoryRepository {
  constructor () {
    this.categories = [
      new TrackCategory({_id: 'MX', name: 'Motocross'}),
      new TrackCategory({_id: 'SX', name: 'Supercross'}),
      new TrackCategory({_id: 'OTH', name: 'Other'})
    ]
  }

  /**
   *
   * @returns {Promise.<Array>}
   */
  all () {
    return Promise.resolve(this.categories)
  }

  /**
   * Provides the category with the given ID.
   *
   * @param id
   *
   * @returns {Promise.<TrackCategory|null>}
   */
  find (id) {
    let category = _.find(this.categories, {_id: id})

    return Promise.resolve(category || null)
  }
}

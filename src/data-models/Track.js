import { BaseDataModel } from './BaseDataModel'

export class Track extends BaseDataModel {
  /**
   * Gives you the list of fields and their types.
   *
   * @returns {{}}
   */
  getFields () {
    return {
      _id: String,
      name: String,
      released_at: Date,
      maker: String,
      description: String,
      download_links: Array,
      reviews: Array
    }
  }
}

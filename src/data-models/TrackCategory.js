import { BaseDataModel } from './BaseDataModel'

export class TrackCategory extends BaseDataModel {
  /**
   * Gives you the list of fields and their types.
   *
   * @returns {{}}
   */
  getFields () {
    return {
      _id: String,
      name: String
    }
  }
}

import { BaseDataModel } from './BaseDataModel'

export class TrackDownloadLink extends BaseDataModel {
  /**
   * Gives you the list of fields and their types.
   *
   * @returns {{}}
   */
  getFields () {
    return {
      link: String,
      description: String
    }
  }
}

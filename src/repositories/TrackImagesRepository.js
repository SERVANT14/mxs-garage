import { ServiceHelper } from '../library/Helpers/ServiceHelper'

export class TrackImagesRepository {
  constructor () {
    this.trackImagesService = ServiceHelper.getClientFor('track-images')
  }

  /**
   * Get a track image.
   *
   * @returns {Promise.<T>}
   */
  find (id) {
    return id
      ? this.trackImagesService.get(id)
      : Promise.resolve(null)
  }

  /**
   * Create a new track image.
   *
   * @param data
   *
   * @returns {Promise.<T>}
   */
  create (data) {
    const formData = new FormData()
    formData.append('image', data)

    return this.trackImagesService
      .create(formData)
  }
}

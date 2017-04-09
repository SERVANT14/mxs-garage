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
  get (id) {
    // return this.tracksService.get(id)
    //   .then(result => new Track(result))
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

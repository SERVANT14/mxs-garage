import _ from 'lodash'
import { FeathersPaginator } from '../data-models/FeathersPaginator'
import { ServiceHelper } from '../library/Helpers/ServiceHelper'
import { Toaster } from '../library/Toaster'
import { Track } from '../data-models/Track'
import { TrackImagesRepository } from './TrackImagesRepository'

export class TracksRepository {
  constructor () {
    this.imagesRepository = new TrackImagesRepository()
    this.tracksService = ServiceHelper.getClientFor('tracks')
  }

  /**
   * Paginate all tracks.
   *
   * @returns {Promise.<FeathersPaginator>}
   */
  getPage (pageNumber = 1, perPage = 15) {
    return this.tracksService
      .find({
        query: {
          $limit: perPage,
          $skip: perPage * (pageNumber - 1),
          $sort: {name: 1}
        }
      })
      .then(result => new FeathersPaginator(result).mapDataTo(Track))
  }

  /**
   * Get a track.
   *
   * @returns {Promise.<T>}
   */
  find (id) {
    return this.tracksService.get(id)
      .then(result => new Track(result).populateRelationships())
  }

  /**
   * Create a new track.
   *
   * @param data
   *
   * @returns {Promise.<T>}
   */
  create (data) {
    return this._createImage(data)
      .then(imageId => {
        let trackData = _.omit(data, ['image'])
        trackData.image_id = imageId

        return this.tracksService
          .create(new Track(trackData).getDataWithoutIdOrRelationships())
          .then(result => Toaster.success('Track created successfully.'))
      })
  }

  /**
   *
   * @param data
   * @returns {Promise.<null|String>}
   * @private
   */
  _createImage (data) {
    if (!_.has(data, 'image')) {
      return Promise.resolve(null)
    }

    return this.imagesRepository.create(data.image)
      .then(result => result.id)
  }
}

import { FeathersPaginator } from '../data-models/FeathersPaginator'
import { ServiceHelper } from '../library/Helpers/ServiceHelper'
import { Toaster } from '../library/Toaster'
import { Track } from '../data-models/Track'

export class TracksRepository {
  constructor () {
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
      .then(result => new FeathersPaginator(result))
  }

  /**
   * Get a track.
   *
   * @returns {Promise.<T>}
   */
  get (id) {
    return this.tracksService.get(id)
      .then(result => new Track(result))
  }

  /**
   * Create a new track.
   *
   * @param data
   *
   * @returns {Promise.<T>}
   */
  create (data) {
    return this.tracksService
      .create(new Track(data).getDataWithoutId())
      .then(result => {
        Toaster.success('Track created successfully.')
        console.log(result)
      })
  }
}

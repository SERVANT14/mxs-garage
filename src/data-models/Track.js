import { BaseDataModel } from './BaseDataModel'
import { TrackCategory } from './TrackCategory'
import { TrackCategoryRepository } from '../repositories/TrackCategoryRepository'
import { TrackImagesRepository } from '../repositories/TrackImagesRepository'

export class Track extends BaseDataModel {
  /**
   * Gives you the list of fields and their types.
   *
   * @returns {{}}
   */
  getFields () {
    return {
      _id: String,
      image_id: String,
      name: String,
      category_id: String,
      released_at: Date,
      creator: String,
      description: String,
      download_links: Array,
      reviews: Array
    }
  }

  /**
   * Gives you the list of relationship fields and their types.
   *
   * @returns {{}}
   */
  getRelationshipFields () {
    return {
      image: Object,
      category: TrackCategory
    }
  }

  /**
   * Populate model relationships.
   *
   * @returns {Promise.<BaseDataModel>}
   */
  populateRelationships () {
    return this._populateImage()
      .then(() => this._populateCategory())
  }

  /**
   * Set the value for the image relationship.
   *
   * @param image
   *
   * @returns {Track}
   */
  setImage (image) {
    this.image_id = image ? image.id : null
    this.image = image

    return this
  }

  /**
   * Set the value for the category relationship.
   *
   * @param category
   *
   * @returns {Track}
   */
  setCategory (category) {
    this.category_id = category ? category.getKey() : null
    this.category = category

    return this
  }

  /**
   * Populates the image relationship.
   *
   * @returns {Promise.<Track>}
   * @private
   */
  _populateImage () {
    return new TrackImagesRepository()
      .find(this.image_id)
      .then(image => this.setImage(image))
  }

  /**
   * Populates the category relationship.
   *
   * @returns {Promise.<Track>}
   * @private
   */
  _populateCategory () {
    return new TrackCategoryRepository()
      .find(this.category_id)
      .then(category => this.setCategory(category))
  }
}

import { BaseDataModel } from './BaseDataModel'

export class FeathersPaginator extends BaseDataModel {
  getFields () {
    return {
      data: Array,
      limit: Number,
      skip: Number,
      total: Number
    }
  }

  /**
   * Maps the data to the given data model.
   *
   * @param DataModel
   *
   * @returns {Promise<FeathersPaginator>}
   */
  mapDataTo (DataModel) {
    this.data = this.data.map(record => new DataModel(record))

    return Promise.all(this.data.map(model => model.populateRelationships()))
      .then(() => this)
  }
}

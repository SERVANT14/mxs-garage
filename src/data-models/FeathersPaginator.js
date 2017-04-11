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
   * @param {BaseDataModel} DataModel
   *
   * @returns {FeathersPaginator}
   */
  mapDataTo (DataModel) {
    this.data = this.data.map(record => new DataModel(record))

    return this
  }
}

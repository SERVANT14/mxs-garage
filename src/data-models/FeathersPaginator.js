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
}

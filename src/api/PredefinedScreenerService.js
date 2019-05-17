
export default class PredefinedScreenerService {
  constructor (ctx) {
    this.$axios = ctx.$axios
    this.$cancelQueue = {}
  }

  getDesc (screenerName, cancelKey = 'predefined_screener_desc') {
    return this.$axios({
      url: '/_api/screeners/' + screenerName + '/desc',
      method: 'get',
      cancelKey
    })
  }

  getParam (screenerName, cancelKey = 'predefined_screener_param') {
    return this.$axios({
      url: '/_api/screeners/' + screenerName + '/param',
      method: 'get',
      cancelKey
    })
  }

  getData (screenerName, data = {}, cancelKey = 'predefined_screener_data') {
    return this.$axios({
      url: '/_api/screeners/' + screenerName + '/data',
      method: 'post',
      data: data,
      params: {
        excel: data['excel']
      },
      cancelKey
    })
  }

  getCount (screenerName, data = {}, cancelKey = 'predefined_screener_count') {
    return this.$axios({
      url: '/_api/screeners/' + screenerName + '/count',
      method: 'post',
      data: data,
      params: {
        excel: data['excel']
      },
      cancelKey
    })
  }

  getGuruSpGridData (data = {}, cancelKey = 'predefined_screener_guru_sp_grid_data') {
    return this.$axios({
      url: '/_api/screeners/guru-sp-grid/data',
      method: 'post',
      data: data,
      params: {
        excel: data['excel']
      },
      cancelKey
    })
  }

  getOverview (screenerName, params, cancelKey = 'predefined_screener_getOverview') {
    return this.$axios({
      url: '/_api/screeners/' + screenerName + '/overview',
      method: 'post',
      data: params,
      cancelKey
    })
  }

  /** Fields */
  async getFields (params = {}) {
    const key = JSON.stringify(params)
    if (!this.fieldsCache) {
      this.fieldsCache = {}
    }
    if (this.fieldsCache[key]) {
      return this.fieldsCache[key]
    }
    const res = this.$axios({
      url: '/_api/screeners/fields',
      method: 'get',
      params: params
    })
    this.fieldsCache[key] = res
    return res
  }

  createField (field) {
    return this.$axios({
      url: '/_api/screeners/fields',
      method: 'post',
      data: field
    })
  }

  updateField (field) {
    return this.$axios({
      url: '/_api/screeners/fields/' + field.id,
      method: 'put',
      data: field
    })
  }

  deleteField (fieldID) {
    return this.$axios({
      url: '/_api/screeners/fields/' + fieldID,
      method: 'delete'
    })
  }

  /** Views */
  getView (idOrName) {
    idOrName = encodeURIComponent(idOrName)
    return this.$axios({
      url: '/_api/screeners/views/' + idOrName,
      method: 'get'
    })
  }

  getViews (params = {}) {
    return this.$axios({
      url: '/_api/screeners/views',
      method: 'get',
      params: params
    })
  }

  createView (view) {
    return this.$axios({
      url: '/_api/screeners/views',
      method: 'post',
      data: view
    })
  }

  updateView (view) {
    return this.$axios({
      url: '/_api/screeners/views/' + view.id,
      method: 'put',
      data: view
    })
  }

  deleteView (viewID) {
    return this.$axios({
      url: '/_api/screeners/views/' + viewID,
      method: 'delete'
    })
  }

  /** Screeners */
  getScreeners (params) {
    return this.$axios({
      url: '/_api/screeners',
      method: 'get',
      params: params
    })
  }

  createScreeners (screener) {
    return this.$axios({
      url: '/_api/screeners',
      method: 'post',
      data: screener
    })
  }

  updateScreener (screener) {
    return this.$axios({
      url: '/_api/screeners/' + screener.id,
      method: 'put',
      data: screener
    })
  }

  deleteScreener (screenerID) {
    return this.$axios({
      url: '/_api/screeners/' + screenerID,
      method: 'delete'
    })
  }

  /** Filters */
  createFilter (filter) {
    return this.$axios({
      url: '/_api/screeners/filters',
      method: 'post',
      data: filter
    })
  }

  updateFilter (filter) {
    return this.$axios({
      url: '/_api/screeners/filters/' + filter.id,
      method: 'put',
      data: filter
    })
  }

  deleteFilter (filterID) {
    return this.$axios({
      url: '/_api/screeners/filters/' + filterID,
      method: 'delete'
    })
  }

  createUserPredefinedScreener (data) {
    return this.$axios({
      url: '/_api/create_user_predefined_screener',
      method: 'post',
      data: data
    })
  }

  getPublicScreeners (params, cancelKey = 'public_screeners') {
    return this.$axios({
      url: '/_api/public_screeners',
      method: 'get',
      params: params,
      cancelKey
    })
  }
}

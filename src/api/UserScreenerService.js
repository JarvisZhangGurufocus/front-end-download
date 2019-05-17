export default class UserScreenerService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getScreenerByHash (hash, cancelKey = 'get_screener_by_hash') {
    return this.$axios({
      url: '/_api/user_screeners/hash?' + hash,
      method: 'get',
      cancelKey: `${cancelKey}:${hash}`
    })
  }

  getAllInOneScreenerCustomizedFilter (cancelKey = 'get_all_in_one_screener_customized_filter') {
    return this.$axios({
      url: '/_api/user_screeners/all_in_one_screener/customized',
      method: 'get',
      cancelKey
    })
  }

  saveAllInOneScreenerCustomizedFilter (screener, cancelKey = 'save_all_in_one_screener_customized_filter') {
    return this.$axios({
      url: '/_api/user_screeners/all_in_one_screener/customized',
      method: 'post',
      data: screener,
      cancelKey,
      clearCache: '{/_api/user_screeners/all_in_one_screener/customized}'
    })
  }

  createShare (screener, cancelKey = 'create_share') {
    return this.$axios({
      url: '/_api/user_screeners/shares',
      method: 'post',
      data: screener,
      cancelKey
    })
  }

  getShare (shareID, cancelKey = 'get_share') {
    return this.$axios({
      url: '/_api/user_screeners/shares/' + shareID,
      method: 'get',
      cancelKey: `${cancelKey}:${shareID}`
    })
  }

  getUserScreeners (params, cancelKey = 'get_user_screeners') {
    return this.$axios({
      url: '/_api/user_screeners',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getUserScreener (screenerID, cancelKey = 'get_user_screener') {
    return this.$axios({
      url: '/_api/user_screeners/' + screenerID,
      method: 'get',
      cancelKey: `${cancelKey}:${screenerID}`
    })
  }

  createUserScreener (screener, cancelKey = 'create_user_screener') {
    return this.$axios({
      url: '/_api/user_screeners',
      method: 'post',
      data: screener,
      cancelKey,
      clearCache: '{/_api/user_screeners}'
    })
  }

  updateUserScreener (screener, cancelKey = 'update_user_screener') {
    return this.$axios({
      url: '/_api/user_screeners/' + screener.id,
      method: 'put',
      data: screener,
      cancelKey,
      clearCache: `{/_api/user_screeners/${screen.id}}`
    })
  }

  deleteUserScreener (screenerID, cancelKey = 'delete_user_screener') {
    return this.$axios({
      url: '/_api/user_screeners/' + screenerID,
      method: 'delete',
      cancelKey: `${cancelKey}:${screenerID}`,
      clearCache: `{/_api/user_screeners/${screen.id}}`
    })
  }

  getUserFields (cancelKey = 'get_user_fields') {
    return this.$axios({
      url: '/_api/user_screeners/fields',
      method: 'get',
      cancelKey
    })
  }

  createUserField (field, cancelKey = 'create_user_field') {
    return this.$axios({
      url: '/_api/user_screeners/fields',
      method: 'post',
      data: field,
      cancelKey,
      clearCache: '{/_api/user_screeners/fields}'
    })
  }

  deleteUserField (fieldID, cancelKey = 'delete_user_field') {
    return this.$axios({
      url: '/_api/user_screeners/fields/' + fieldID,
      method: 'delete',
      cancelKey: `${cancelKey}:${fieldID}`,
      clearCache: '{/_api/user_screeners/fields}'
    })
  }

  updateUserField (field, cancelKey = 'update_user_field') {
    return this.$axios({
      url: '/_api/user_screeners/fields/' + field.id,
      method: 'put',
      data: field,
      cancelKey,
      clearCache: '{/_api/user_screeners/fields}'
    })
  }

  getUserViews (params, cancelKey = 'get_user_views') {
    return this.$axios({
      url: '/_api/user_screeners/views',
      method: 'get',
      params,
      cancelKey
    })
  }

  getUserView (id, cancelKey = 'get_user_view') {
    return this.$axios({
      url: '/_api/user_screeners/views/' + id,
      method: 'get',
      cancelKey: `${cancelKey}:${id}`
    })
  }

  createUserView (view, cancelKey = 'create_user_view') {
    return this.$axios({
      url: '/_api/user_screeners/views',
      method: 'post',
      data: view,
      cancelKey,
      clearCache: '{/_api/user_screeners/views}'
    })
  }

  updateUserView (view, cancelKey = 'update_user_view') {
    return this.$axios({
      url: '/_api/user_screeners/views/' + view.id,
      method: 'put',
      data: view,
      cancelKey,
      clearCache: `{/_api/user_screeners/views/${view.id}}`
    })
  }

  deleteUserView (id, cancelKey = 'delete_user_view') {
    return this.$axios({
      url: '/_api/user_screeners/views/' + id,
      method: 'delete',
      cancelKey: `${cancelKey}:${id}`,
      clearCache: `{/_api/user_screeners/views/${id}}`
    })
  }
}

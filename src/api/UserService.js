
export default class UserService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getUser () {
    return this.$axios({
      url: '/_api/user/info',
      method: 'get'
    })
  }

  getIdByEmailorName (email, cancelKey = 'get_id_by_email_name') {
    return this.$axios({
      url: '/_api/user/id',
      method: 'get',
      params: { email },
      cancelKey
    })
  }

  setUserData (params, cancelKey = 'set_user_data') {
    return this.$axios({
      url: '/_api/user/user_data',
      method: 'put',
      data: params,
      cancelKey
    })
  }

  getUserDcfTemplate (cancelKey = 'get_user_dcf_template') {
    return this.$axios({
      url: '/_api/dcf/templates',
      method: 'get',
      cancelKey
    })
  }

  deleteUserDcfTemplate (id, cancelKey = 'delete_user_dcf_template') {
    return this.$axios({
      url: '/_api/dcf/templates/' + id,
      method: 'delete',
      cancelKey,
      clearCache: '{/_api/dcf/templates}'
    })
  }

  createUserDcfTemplate (params, cancelKey = 'create_user_dcf_template') {
    return this.$axios({
      url: '/_api/dcf/templates',
      method: 'post',
      data: params,
      cancelKey,
      clearCache: '{/_api/dcf/templates}'
    })
  }
}

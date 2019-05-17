export default class AlertService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  createAlert (alert) {
    return this.$axios({
      url: '/_api/user/alerts',
      method: 'post',
      data: alert
    })
  }

  deleteAlert (id, type) {
    return this.$axios({
      url: '/_api/user/alerts/' + type + '/' + id,
      method: 'delete',
      clearCache: `{/_api/user/alerts/${type}}`
    })
  }

  getAlerts (type) {
    return this.$axios({
      url: '/_api/user/alerts/' + type,
      method: 'get'
    })
  }
}

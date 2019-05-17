export default class FileService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  clearCache () {
    return this.$axios({
      url: '/_api/admin/clear_cache',
      method: 'get'
    })
  }

  findMissedInstholding (table) {
    return this.$axios({
      url: '/_api/admin/find_missed_instholdings/' + table,
      method: 'get'
    })
  }
}

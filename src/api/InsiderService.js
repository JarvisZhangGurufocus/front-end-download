
export default class GuruService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getInsiderTradingsById (params) {
    return this.$axios({
      url: '/_api/insider_tradings',
      method: 'get',
      params: params
    })
  }
}

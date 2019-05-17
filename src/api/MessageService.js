
export default class GuruService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getMessage (messageID) {
    return this.$axios({
      url: '/_api/messages/' + messageID,
      method: 'get'
    })
  }

  getMessageList (params) {
    return this.$axios({
      url: '/_api/messages',
      method: 'get',
      params: params
    })
  }

  getGoogleMessageList (params) {
    return this.$axios({
      url: '/_api/google_messages',
      method: 'get',
      params: params
    })
  }

  getHeadlines (params) {
    return this.$axios({
      url: '/_api/headlines',
      method: 'get',
      params: params
    })
  }
}

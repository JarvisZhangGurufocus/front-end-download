export default class SearchService {
  constructor (ctx) {
    this.$axios = ctx.$axios
    this.$cancelQueue = {}
  }

  search (keywords, all_exchanges = false, cancelKey = 'search') {
    return this.$axios({
      url: '/_api/search',
      params: {
        q: keywords,
        all_exchanges: all_exchanges
      },
      method: 'get',
      cancelKey
    })
  }
}

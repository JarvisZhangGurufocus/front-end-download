export default class ScreenerService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getGuruTrades (params, cancelKey = 'get_guru_trades') {
    return this.$axios({
      url: '/_api/screeners/trades',
      method: 'post',
      data: params,
      cancelKey
    })
  }

  getInsiderTrades (params, cancelKey = 'get_insider_trades') {
    return this.$axios({
      url: '/_api/screeners/insiders',
      method: 'post',
      data: params,
      cancelKey
    })
  }

  getStocks (params, cancelKey = 'get_stocks') {
    return this.$axios({
      url: '/_api/screeners/stocks',
      method: 'post',
      data: params,
      cancelKey
    })
  }

  getExample (params, cancelKey = 'get_example') {
    return this.$axios({
      url: '/_api/screeners/example',
      method: 'post',
      data: params,
      cancelKey
    })
  }
}

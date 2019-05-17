export default class GuruService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getFinancialHistory (symbol, params, cancelKey = 'get_fincnaisl_history') {
    return this.$axios({
      url: '/_api/financials/' + symbol + '/history',
      method: 'post',
      data: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }
}

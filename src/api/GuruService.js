
export default class GuruService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  guruName2Url (name) {
    if (!name) return name
    if (typeof (name) === 'number') return name
    name = name
      .replace(new RegExp(' ', 'g'), '+')
      .replace(new RegExp('/', 'g'), '=')
      .toLowerCase()
    name = encodeURI(name)
    return name
  }

  getGuruScreener (screenerName, guruIDorName, params, cancelKey = 'get_guru_screener') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/portfolio/screener/' + screenerName,
      method: 'get',
      params: params,
      cancelKey: `${screenerName}:${screenerName}:${guruIDorName}`
    })
  }

  getGuruPopover (guruIDorName, cancelKey = 'get_guru_popover') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/popover',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruSummary (guruIDorName, cancelKey = 'get_guru_summary') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/summary',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruPicks (guruIDorName, params, cancelKey = 'get_guru_picks') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/latest-picks',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruTopHoldings (guruIDorName, cancelKey = 'get_guru_top_holdings') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/top-holdings',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruPicksHistoryByStockID (guruIDorName, stockid, cancelKey = 'get_guru_picks_history') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/history/stocks/' + stockid,
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruRelatedTrades (guruIDorName, params, cancelKey = 'get_guru_realted_trades') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/related-trades',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruPortfolioDates (guruIDorName, cancelKey = 'get_guru_portfolio_dates') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/portfolio/dates',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruPortfolioStatistics (guruIDorName, portdate = '', cancelKey = 'get_guru_portfolio_statistics') {
    guruIDorName = this.guruName2Url(guruIDorName)
    if (portdate) portdate += '/'
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/portfolio/' + portdate + 'statistics',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruPortfolio (guruIDorName, portdate, params, cancelKey = 'get_guru_portfolio') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/portfolio/' + portdate,
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruRealtimePicks (guruIDorName, params, cancelKey = 'get_guru_realtime_picks') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/realtime-picks',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getHoldingsHistory (guruIDorName, cancelKey = 'get_holding_history') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/history/holdings',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getYearlyReturnHistory (guruIDorName, cancelKey = 'get_yearly_return_history') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/history/yearly_return',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getAllocationHistory (guruIDorName, cancelKey = 'get_allocation_history') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/history/allocation',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getSectorWeightingHistory (guruIDorName, cancelKey = 'get_sector_weighting_history') {
    guruIDorName = this.guruName2Url(guruIDorName)
    return this.$axios({
      url: '/_api/gurus/' + guruIDorName + '/history/sector_weighting',
      method: 'get',
      cancelKey: `${cancelKey}:${guruIDorName}`
    })
  }

  getGuruTradingsById (params, cancelKey = 'get_guru_tradings_by_id') {
    return this.$axios({
      url: '/_api/guru_tradings',
      method: 'get',
      params: params,
      cancelKey
    })
  }
}

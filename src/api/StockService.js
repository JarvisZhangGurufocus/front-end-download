export default class StockService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  search (keyword, allExchanges = false, cancelKey = 'stock_search') {
    return this.$axios({
      url: '/_api/stocks/_search',
      params: {
        q: keyword,
        all_exchanges: allExchanges
      },
      method: 'get',
      cancelKey
    })
  }

  getStocks (params) {
    return this.$axios({
      url: '/_api/stocks',
      params: params,
      method: 'get'
    })
  }

  getStockPopover (symbol, cancelKey = 'get_stock_popover') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/popover',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockSummary (symbol, cancelKey = 'get_stock_summary') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/summary',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockFilings (symbol, cancelKey = 'get_stock_filings') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/filings',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockDetails (symbol, params, cancelKey = 'get_stock_details') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/detail',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockGlobalRank (symbol, cancelKey = 'get_stock_global_rank') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/rank',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockTrades (symbol, params, cancelKey = 'get_stock_trades') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/trades',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getFinancials (symbol, itemsArr, type, length = 50, cancelKey = 'get_financials') {
    let itemsStr = itemsArr.join(',')
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/financials/' + itemsStr + '?type=' + type + '&length=' + length,
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getFinancialsSummary (symbol, cancelKey = 'get_financials_summary') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/financials_summary?type=a&length=10',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockHoldings (symbol, params, cancelKey = 'get_stock_holdings') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/holdings',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockInsiderBuys (symbol, params, cancelKey = 'get_stock_insider_buys') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/insider',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockInsiderBuysHistory (symbol, cancelKey = 'get_stock_insider_buys_history') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/history/insider',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockInsiderVolumeHistory (symbol, cancelKey = 'get_stock_insider_volume_history') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/history/insider_volume',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockTopInsiderHoldings (symbol, cancelKey = 'get_stock_insider_top_holdings') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/top_insider',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockPriceHistory (symbol, params) {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/history/price',
      method: 'get',
      params: params
    })
  }

  getStockIndicatorHistory (symbol, indicator, params, cancelKey = 'get_stock_indicator_history') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/indicators/' + indicator + '/history',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockIndicatorLatest (symbol, indicator, params) {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/indicators/' + indicator + '/latest',
      method: 'get',
      params: params
    })
  }

  getExchanges (cancelKey = 'get_exchanges') {
    return this.$axios({
      url: '/_api/stocks/exchanges',
      method: 'get',
      cancelKey
    })
  }

  getNraExchanges (cancelKey = 'get_nra_exchanges') {
    return this.$axios({
      url: '/_api/stocks/nra_exchanges',
      method: 'get',
      cancelKey
    })
  }

  getInsiderExchanges (cancelKey = 'get_insider_exchanges') {
    return this.$axios({
      url: '/_api/stocks/insider_exchanges',
      method: 'get',
      cancelKey
    })
  }

  getCompanyRegions (cancelKey = 'get_company_regions') {
    return this.$axios({
      url: '/_api/stocks/companies/regions',
      method: 'get',
      cancelKey
    })
  }

  getExchangeRegions (cancelKey = 'get_company_regions') {
    return this.$axios({
      url: '/_api/stocks/exchanges/regions',
      method: 'get',
      cancelKey
    })
  }

  getFinancialDefinitionArray (cancelKey = 'get_financial_definition_arr') {
    return this.$axios({
      url: '/_api/financials/group_arr',
      method: 'get',
      cancelKey
    })
  }

  getStocksMapArr (params, cancelKey = 'get_stocks_map_arr') {
    return this.$axios({
      url: '/_api/screeeners/map_arr',
      method: 'post',
      data: params,
      cancelKey
    })
  }

  getStockCompetitors (symbol, screenKey, params) {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/competitor?type=' + screenKey,
      method: 'get',
      params: params
    })
  }

  getComparePCompanyData (pStockid, stockid, startDate, cancelKey = 'get_compare_pcompany_data') {
    return this.$axios({
      url: '/_api/stocks/' + pStockid + '/' + stockid + '/' + startDate + '/compare_pcomapny_data',
      method: 'get',
      cancelKey
    })
  }

  getAnalystEstimate (symbol, params, cancelKey = 'get_analyst_estimate') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/estimate',
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getSummaryView (symbol, cancelKey = 'get_summary_view') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/summary_view',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockDividends (symbol, cancelKey = 'get_stock_dividends') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/dividend',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getHistoryDividend (symbol, params, cancelKey = 'get_history_dividend') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/dividend_historical_data',
      method: 'post',
      data: params,
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  getStockId (symbol, cancelKey = 'get_stockid') {
    return this.$axios({
      url: '/_api/stocks/' + symbol + '/stockid',
      method: 'get',
      cancelKey: `${cancelKey}:${symbol}`
    })
  }
}

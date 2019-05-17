export default class PortfolioService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  createPortfolio (data) {
    return this.$axios({
      url: '/_api/portfolios',
      method: 'post',
      data: data,
      clearCache: '{/_api/portfolios}'
    })
  }

  getPortfolios (cancelKey = 'get_portfolios') {
    return this.$axios({
      url: '/_api/portfolios',
      method: 'get',
      cancelKey
    })
  }

  getPortfolioDetails (portId) {
    return this.$axios({
      url: '/_api/portfolios/port_details/' + portId,
      method: 'post'
    })
  }

  portfolioChartData (symbol, series, cancelKey = 'portfolio_chart_data') {
    return this.$axios({
      url: '/_api/portfolios/chart_view/single',
      method: 'get',
      params: { symbol, series },
      cancelKey: `${cancelKey}:${symbol}`
    })
  }

  addSymbolToPortfolio (data) {
    return this.$axios({
      url: '/_api/portfolios/add',
      method: 'post',
      data: data,
      clearCache: '/_api/portfolios'
    })
  }

  getPortfolioModels (modelName, cancelKey = 'get_portfolio_model') {
    return this.$axios({
      url: '/_api/portfolio_models/' + modelName + '/data',
      method: 'get',
      cancelKey
    })
  }

  createEmailAlerts (symbol, cancelKey = 'create_email_alerts') {
    return this.$axios({
      url: '/_api/portfolios/' + symbol + '/addEmailAlerts',
      method: 'post',
      cancelKey,
      clearCache: '/_api/portfolios'
    })
  }

  createManualOfStocksPDF (symbolStr, cancelKey = 'create_manual_of_stocks_pdf') {
    return this.$axios({
      url: '/_api/portfolios/stockmanual_pdf_report/' + symbolStr,
      method: 'get',
      cancelKey
    })
  }
}

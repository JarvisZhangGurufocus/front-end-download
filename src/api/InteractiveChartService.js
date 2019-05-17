export default class InteractiveChartService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getIndicators () {
    return this.$axios({
      url: '/_api/interactivechart/indicators',
      method: 'get'
    })
  }

  getIndicatorsData (ticker, indicator, params) {
    return this.$axios({
      url: '/_api/interactivechart/' + ticker + '/series/' + indicator,
      method: 'get',
      params: params
    })
  }

  getIndicatorsDataWithInput (ticker, indicator, params) {
    return this.$axios({
      url: '/_api/interactivechart/' + ticker + '/series/' + indicator,
      method: 'get',
      params: params
    })
  }

  searchTemplates (keywords) {
    return this.$axios({
      url: '/_api/interactivechart/templates/_search',
      method: 'get',
      params: {
        q: keywords
      }
    })
  }

  getTemplates () {
    return this.$axios({
      url: '/_api/interactivechart/my_templates',
      method: 'get'
    })
  }

  getAllTemplates (page) {
    return this.$axios({
      url: '/_api/interactivechart/templates',
      method: 'get',
      params: {
        page
      }
    })
  }

  deleteUserTemplate (id) {
    return this.$axios({
      url: '/_api/interactivechart/templates/' + id,
      method: 'delete',
      clearCache: '{/_api/interactivechart/my_templates}'
    })
  }

  saveUserTemplate (name, privacy, chartOptions) {
    return this.$axios({
      url: '/_api/interactivechart/templates',
      method: 'post',
      data: { name: name, privacy: privacy, chart_options: chartOptions },
      clearCache: '{/_api/interactivechart/my_templates}'
    })
  }

  updateUserTemplate (id, chartOptions) {
    return this.$axios({
      url: '/_api/interactivechart/templates',
      method: 'put',
      data: { id: id, chart_options: chartOptions },
      clearCache: '{/_api/interactivechart/my_templates}'
    })
  }

  getEconomicIndicators () {
    return this.$axios({
      url: '/_api/economicindicators',
      method: 'get'
    })
  }

  getEcoIndicatorsData (id, trendline) {
    return this.$axios({
      url: '/_api/economicindicators/' + id + '?trendline=' + trendline,
      method: 'get'
    })
  }

  getEcoIndicator (id) {
    return this.$axios({
      url: '/_api/economicindicators/item/' + id,
      method: 'get'
    })
  }

  getCustomizedIndicatorData (ticker, indicatorExpression, type) {
    return this.$axios({
      url: '/_api/interactivechart/' + ticker + '/customized_indicator/' + indicatorExpression + '?type=' + type,
      method: 'get'
    })
  }

  saveCustomizedIndicator (ticker, indicatorExpression, type) {
    // return this.$axios({
    //   url: '/_api/interactivechart/customized_indicator',
    //   method: 'post',
    //   data: { field_name: name, display_name: privacy }
    // })
  }
}

import TaskHandler from './TaskHandler'
import ObjectHelper from '../../utils/ObjectHelper'

export default class AllInOneScreenerHandler extends TaskHandler {
  prepareDownload () {
    super.prepareDownload()
    this.$set(this.task, 'loading', false)
    this.$set(this.task, 'progress', 100)
  }

  beforeDownload () {}
  download () {}
  afterDownload () {}

  async prepareExport () {
    let rowLength = 10

    this.task.export_data = []

    if (this.task.filters) {
      this.task.export_data.push([''])
      this.task.export_data.push(['All In One Screener Backtesting'])
      this.task.export_data.push(['Filters:'])
      this.task.export_data.push(['Field', 'Operator', 'Value'])

      for (let i = 0; i < this.task.filters.length; i++) {
        let filter = this.task.filters[i]
        if (!filter || !filter.field) return

        let row = [filter.field.display_name]

        switch (filter.operator) {
          case 'raw':
            row.push('Active')
            return
          case 'range':
            row.push('Between')
            break
          default:
            row.push(filter.operator)
            break
        }

        switch (filter.field.field_name) {
          case 'country':
            const countries = filter.right.replace(new RegExp(/[*.|^$]/, 'g'), ' ').split(' ')
            countries.forEach(country => {
              if (country) {
                row.push(country)
              }
            })
            break
          case 'industry':
            const regions = await this.$api.getCatchOrFetch('files', 'IndustryJson', 0)
            filter.right.forEach(industry => {
              let region = regions.find(item => +item.industrycode === +industry)
              if (region) {
                row.push(region.industry)
              }
            })
            break
          case 'guru_name':
            const gurus = await this.$api.groups.getGroupGurus('plus', { per_page: filter.right.length, guru_filters: [{ left: 'id', operator: 'in', right: filter.right }] })
            if (gurus && gurus.data) {
              gurus.data.forEach(guru => {
                row.push(guru.GuruName)
              })
            }
            break
          case 'symbol':
            const stocks = await this.$api.stocks.getStocks({ stockids: filter.right })
            if (stocks && stocks.length > 0) {
              stocks.forEach(stock => {
                row.push(stock.exchange + ':' + stock.symbol)
              })
            }
            break
          default:
            if (typeof (filter.right) === 'object') {
              row.push(JSON.stringify(filter.right))
            } else {
              row.push(filter.right)
            }
            break
        }

        this.task.export_data.push(row)
      }
    }

    this.handleBacktestingOptions()

    for (let i = 0; i < this.task.test_result.length; i++) {
      let part = this.task.test_result[i]
      if (part.component === 'backtesting-performance') {
        await this.handlePerformanceTable(part)
      } else {
        await this.handleBacktestingTable(part)
      }
    }

    this.task.export_data.forEach(row => {
      if (rowLength < row.length) {
        rowLength = row.length
      }
    })

    this.task.export_data.forEach(row => {
      while (row.length < rowLength) {
        row.push('')
      }
    })
  }

  async handleBacktestingOptions () {
    if (!this.task.backtesting_options) { return }

    this.task.export_data.push([''])
    this.task.export_data.push(['Backtesting options'])
    this.task.export_data.push(['Rank By', '# Stocks', 'Start Date', 'Rebalance', 'Initial Amount'])

    let row = []

    if (this.task.backtesting_options.sort_field) {
      row.push(this.task.backtesting_options.sort_field.display_name + ' ' + this.task.backtesting_options.sort_order)
    } else {
      row.push('-')
    }

    if (this.task.backtesting_options.number_of_stock) {
      row.push(this.task.backtesting_options.number_of_stock)
    } else {
      row.push('-')
    }

    if (this.task.backtesting_options.screener_date) {
      row.push(this.task.backtesting_options.screener_date)
    } else {
      row.push('-')
    }

    if (this.task.backtesting_options.rebalance_freq) {
      row.push(this.task.backtesting_options.rebalance_freq.name)
    } else {
      row.push('-')
    }

    if (this.task.backtesting_options.initial_amount) {
      row.push(this.task.backtesting_options.initial_amount)
    } else {
      row.push('-')
    }

    this.task.export_data.push(row)
  }

  async handleBacktestingTable (data) {
    this.task.export_data.push([''])
    this.task.export_data.push(['From', data.start_date, 'To', data.end_date])

    if (!data || !data.data || data.data.length === 0) {
      this.task.export_data.push(['No Stocks Found'])
      return
    }

    const titleRow = ['Ticker', 'Company', 'Revenue', 'Begin Price', 'Begin Value', 'End Price', 'End Value', 'Gain', 'Spinoff', 'Merge']

    if (this.task.fields) {
      this.task.fields.forEach(field => { titleRow.push(field.display_name) })
    }

    /** Download All Fields */
    if (this.task.fields && this.task.filters && this.task.fields.length > this.task.filters.length) {
      const stockids = ObjectHelper.pluck(data.data, 'stockid')
      const exchanges = ObjectHelper.pluck(data.data, 'exchange')
      const history = data.start_date.substring(0, 4) + data.start_date.substring(5, 7)
      const basicFields = ObjectHelper.pluck(this.task.fields, 'field_name')
      const stocks = await this.$api.screener.getStocks({
        fields: basicFields,
        exchanges: exchanges,
        history: history,
        page: 1,
        per_page: stockids.length,
        use_in_screener: 1,
        filters: [{ left: 'stockid', operator: 'in', right: stockids }]
      }, 'xls_download_backtesting').catch(err => {
        console.error(err)
      })
      if (stocks && stocks.data) {
        data.data.forEach(row => {
          const stock = stocks.data.find(item => item.stockid === row.stockid)
          if (stock) {
            Object.assign(row, stock)
          }
        })
      }
    }
    this.task.export_data.push(titleRow)

    data.data.forEach(row => {
      const rowData = [row.display_symbol, row.company, row.sales, row.begin_price, row.begin_value, row.end_price, row.end_value, row.gain]
      if (row.spinoffs && row.spinoffs.length > 0) {
        let spinoffText = ''
        row.spinoffs.forEach(spinoff => { spinoffText += spinoff.spinoff_stock + ' at ' + spinoff.date + ', ' })
        rowData.push(spinoffText)
      } else {
        rowData.push('')
      }
      if (row.mergers && row.mergers.length > 0) {
        let mergeText = ''
        row.mergers.forEach(merge => { mergeText += merge.merge_stock + ' at ' + merge.date + ', ' })
        rowData.push(mergeText)
      } else {
        rowData.push('')
      }

      /** Download All Fields */
      if (this.task.fields) {
        this.task.fields.forEach(field => { rowData.push(row[field.field_name]) })
      }

      this.task.export_data.push(rowData)
    })

    this.task.export_data.push([
      'Summary', '', '', '', data.begin_value, '', data.end_value, data.gain
    ])
  }

  async handlePerformanceTable (data) {
    let parts = ['portfolio', 'sp500_etf', 'djia_etf', 'nasdaq_etf']

    this.task.export_data.push([''])
    this.task.export_data.push(['Look Back Returns to Today'])
    this.task.export_data.push(['', '1 Month', '3 Months', '6 Months', '12 Months', 'YTD', 'All Time'])
    parts.forEach(part => {
      if (data[part] && data[part].look_back) {
        const rowData = [ part.replace('_', ' ').toUpperCase() ]
        data[part].look_back.forEach(col => {
          rowData.push(col.gain)
        })
        rowData.push(data[part].gain)
        this.task.export_data.push(rowData)
      }
    })

    this.task.export_data.push([''])
    this.task.export_data.push(['Look Back Returns to Today'])
    this.task.export_data.push(['', '1 Month', '3 Months', '6 Months', '12 Months', 'YTD', 'All Time'])
    parts.forEach(part => {
      if (data[part] && data[part].look_forward) {
        const rowData = [ part.replace('_', ' ').toUpperCase() ]
        data[part].look_forward.forEach(col => {
          rowData.push(col.gain)
        })
        rowData.push(data[part].gain)
        this.task.export_data.push(rowData)
      }
    })

    this.task.export_data.push([''])
    this.task.export_data.push(['Look Back Returns to Today'])
    this.task.export_data.push(['Year', 'Portfolio Gain', 'SP500 Gain', 'NASDAQ Gain', 'DJIA Gain'])
    if (data['portfolio'] && data['portfolio'].yearly) {
      data['portfolio'].yearly.forEach(year => {
        const rowData = [year.date]
        parts.forEach(part => {
          const partYearData = data[part].yearly.find(item => item.date === year.date)
          if (partYearData) {
            rowData.push(partYearData.gain)
          } else {
            rowData.push('N/A')
          }
        })
        this.task.export_data.push(rowData)
      })

      const overallData = ['Overall']
      parts.forEach(part => {
        if (data[part]) {
          overallData.push(data[part].gain)
        } else {
          overallData.push('N/A')
        }
      })
      this.task.export_data.push(overallData)
    }
  }
}

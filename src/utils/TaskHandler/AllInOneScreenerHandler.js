import TaskHandler from './TaskHandler'

export default class AllInOneScreenerHandler extends TaskHandler {
  async beforeExport () {
    let rowLength = this.task.export_data[0].length

    let aioTitleRows = [
      [''],
      ['Screener link:', this.task.share_url],
      [`Notice:`, ` This file contains only first ${this.task.status === 5 ? '5000' : '1000'} records. Market Cap(Mil) is the market cap in stock's trading currency (please refer to column D); US$ Market Cap($Mil) is the market cap converted to USD.`],
      [''],
      ['Filters:'],
      ['Field', 'Operator', 'Value']
    ]

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
          let countries = filter.right.replace(new RegExp(/[*.|^$]/, 'g'), ' ').split(' ')
          countries.forEach(country => {
            if (country) {
              row.push(country)
            }
          })
          break
        case 'industry':
          let regions = await this.$api.getCatchOrFetch('files', 'IndustryJson', 0)
          filter.right.forEach(industry => {
            let region = regions.find(item => +item.industrycode === +industry)
            if (region) {
              row.push(region.industry)
            }
          })
          break
        case 'guru_name':
          let gurus = await this.$api.groups.getGroupGurus('plus', { per_page: filter.right.length, guru_filters: [{ left: 'id', operator: 'in', right: filter.right }] })
          if (gurus && gurus.data) {
            gurus.data.forEach(guru => {
              row.push(guru.GuruName)
            })
          }
          break
        case 'symbol':
          let stocks = await this.$api.stocks.getStocks({ stockids: filter.right })
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

      aioTitleRows.push(row)
    }

    aioTitleRows.push([''])

    aioTitleRows.forEach(row => {
      if (rowLength < row.length) {
        rowLength = row.length
      }
    })

    aioTitleRows.forEach(row => {
      while (row.length < rowLength) {
        row.push('')
      }
    })

    this.task.export_data = aioTitleRows.concat(this.task.export_data)

    await super.beforeExport()
  }
}

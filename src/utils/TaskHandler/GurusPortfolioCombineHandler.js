import TaskHandler from './TaskHandler'

export default class GurusPortfolioCombineHandler extends TaskHandler {
  async afterDownload () {
    let task = this.task
    let gurus = {}
    let data = {}
    task.data.forEach(row => {
      if (!gurus[ row.guru_id ]) {
        gurus[ row.guru_id ] = row.guru_name
      }

      if (!data[ row.stockid ]) {
        data[ row.stockid ] = JSON.parse(JSON.stringify(row))
        data[ row.stockid ]['symbol'] = data[ row.stockid ]['exchange'] + ':' + data[ row.stockid ]['symbol']
        data[ row.stockid ]['current_hold_count'] = 0
      }

      data[ row.stockid ]['current_hold_count']++
      data[ row.stockid ][ row.guru_name ] = row.shares
    })

    task.data = Object.values(data)
    task.data.sort((a, b) => {
      if (a.symbol > b.symbol) {
        return 1
      }
      if (a.symbol < b.symbol) {
        return -1
      }
      if (a.exchange > b.exchange) {
        return 1
      }
      if (a.exchange < b.exchange) {
        return -1
      }
      if (a.class > b.class) {
        return 1
      }
      if (a.class < b.class) {
        return -1
      }
      if (a.guru_id > b.guru_id) {
        return 1
      }
      if (a.guru_id < b.guru_id) {
        return -1
      }
      return 0
    })

    Object.keys(gurus).forEach(guruID => {
      task.view.fields.push({ field_name: gurus[guruID], display_name: gurus[guruID] })
    })

    this.gurus = Object.values(gurus)
  }

  async beforeExport () {
    if (this.gurus) {
      let rowLength = this.task.export_data[0].length

      let empLine = []
      let portfolioInfoLine = ['GuruFocus Customized Tracking: ' + this.gurus.length, '']

      this.gurus.forEach(guruName => {
        portfolioInfoLine[1] += guruName + ', '
      })

      while (empLine.length < rowLength) {
        empLine.push('')
      }

      while (portfolioInfoLine.length < rowLength) {
        portfolioInfoLine.push('')
      }

      this.task.export_data.unshift(empLine)
      this.task.export_data.unshift(portfolioInfoLine)
    }
    super.beforeExport()
  }
}

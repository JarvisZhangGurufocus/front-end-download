import TaskHandler from './TaskHandler'

export default class GuruPortfolioHandler extends TaskHandler {
  async afterDownload () {
    this.guru = this.task.guru ? this.task.guru : {}

    let realtimeLength = 0
    this.task.data.forEach(row => {
      if (row.is_realtime) {
        realtimeLength++
      }
    })
    this.realtimeLength = realtimeLength
  }

  async beforeExport () {
    let rowLength = this.task.export_data[0].length

    let realtimeDate = 'last portfolio date'
    if (this.guru['13f_date']) {
      realtimeDate = this.guru['13f_date']
    }

    let realtimeTitleRow = ['(Realtime Picks Since ' + realtimeDate + ')']

    let portfolioDate = ''
    if (this.guru['portfolio_date']) {
      portfolioDate = this.guru['portfolio_date']
    } else if (this.guru['13f_date']) {
      portfolioDate = this.guru['13f_date']
    }
    let tradesTitleRow = ['(Portfolio Holdings of ' + this.guru['GuruName'] + ' as of ' + portfolioDate + ')']

    while (tradesTitleRow.length < rowLength) {
      realtimeTitleRow.push('')
      tradesTitleRow.push('')
    }

    if (this.realtimeLength > 0) {
      this.task.export_data.splice(this.realtimeLength + 2, 0, this.task.export_data[0])
      this.task.export_data.splice(this.realtimeLength + 2, 0, tradesTitleRow)
      this.task.export_data.unshift(realtimeTitleRow)
    } else {
      this.task.export_data.unshift(tradesTitleRow)
    }

    super.beforeExport()
  }
}

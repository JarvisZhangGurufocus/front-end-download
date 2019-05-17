import TaskHandler from './TaskHandler'

export default class GuruTopHoldingsHandler extends TaskHandler {
  async afterDownload () {
    this.task.data.forEach(row => {
      delete row['display_symbol']

      row['top 1'] = ''
      row['top 2'] = ''
      row['top 3'] = ''
      row['top 4'] = ''
      row['top 5'] = ''
      row['top 6'] = ''
      row['top 7'] = ''
      row['top 8'] = ''
      row['top 9'] = ''
      row['top 10'] = ''

      if (row.trades) {
        row.trades.forEach((trade, idx) => {
          row['top ' + (idx + 1)] = trade.display_symbol + '(' + trade.position + ')'
        })
      }
      if (row.top_10_h) {
        row.top_10_h.forEach((trade, idx) => {
          row['top ' + (idx + 1)] = trade.display_symbol + '(' + trade.position + ')'
        })
      }
    })
  }
}

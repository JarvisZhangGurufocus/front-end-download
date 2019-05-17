import TaskHandler from './TaskHandler'

export default class GuruPortfolioHandler extends TaskHandler {
  async afterDownload () {
    this.task.data.forEach(row => {
      row.symbol = row.exchange + ':' + row.symbol
    })

    this.task.data.sort((a, b) => {
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
  }
}

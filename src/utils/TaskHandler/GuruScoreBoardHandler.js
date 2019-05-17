import TaskHandler from './TaskHandler'

export default class GuruScoreboardHandler extends TaskHandler {
  async afterDownload () {
    this.task.data.forEach(row => {
      if (row.inceptyear > 0 && row.periodendyear > 0) {
        row.period = row.inceptyear + '-' + row.periodendyear
      } else {
        row.period = '-'
      }
    })
  }
}

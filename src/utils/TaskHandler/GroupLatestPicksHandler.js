import TaskHandler from './TaskHandler'
import ObjectHelper from '../../utils/ObjectHelper'

export default class GroupLatestPicksHandler extends TaskHandler {
  async afterDownload () {
    this.task.data.forEach(row => {
      if (row.latest_picks) {
        row['Add'] = ''
        row['Reduce'] = ''
        row['Sold Out'] = ''
        row['New Buy'] = ''

        if (row.latest_picks['Add']) {
          row['Add'] = ObjectHelper.pluck(row.latest_picks['Add'], 'display_symbol').join(',')
        }
        if (row.latest_picks['New Buy']) {
          row['New Buy'] = ObjectHelper.pluck(row.latest_picks['New Buy'], 'display_symbol').join(',')
        }
        if (row.latest_picks['Reduce']) {
          row['Reduce'] = ObjectHelper.pluck(row.latest_picks['Reduce'], 'display_symbol').join(',')
        }
        if (row.latest_picks['Sold Out']) {
          row['Sold Out'] = ObjectHelper.pluck(row.latest_picks['Sold Out'], 'display_symbol').join(',')
        }
        delete row.latest_picks
      }
    })
  }
}

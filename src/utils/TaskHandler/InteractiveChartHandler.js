import TaskHandler from './TaskHandler'

export default class InteractiveChartHandler extends TaskHandler {
  async beforeDownload () {
    this.task.view.fields = this.processFields()
    this.task.data = this.processData()
    super.beforeDownload()
  }

  async processData () {
    let dateArr = []
    let dataArr = []

    for (let item of this.task.data) {
      let temArr = []
      for (let dataItem of item.data) {
        // Generate date array for all data series
        let date = this.formatDate(dataItem[0])
        if (!dateArr.includes(date)) {
          dateArr.push(date)
        }

        temArr[this.formatDate(dataItem[0])] = dataItem[1]
      }

      dataArr[item.id] = temArr
    }

    dateArr.sort()

    let finalData = []

    for (let date of dateArr) {
      let rowItem = {
        date: date
      }

      for (let name in dataArr) {
        if (date in dataArr[name]) {
          rowItem[name] = dataArr[name][date]
        } else {
          rowItem[name] = null
        }
      }

      finalData.push(rowItem)
    }
    return finalData
  }

  async processFields () {
    let fields = [{
      field_name: 'date',
      display_name: 'Date'
    }]
    for (let item of this.task.data) {
      fields.push({
        field_name: item.id,
        display_name: item.name
      })
    }
    return fields
  }

  async formatDate (date) {
    var d = new Date(date)

    var month = '' + (d.getMonth() + 1)

    var day = '' + d.getDate()

    var year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
}

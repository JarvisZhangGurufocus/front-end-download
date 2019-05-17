import ExcelHelper from '../../utils/ExcelHelper'
import DateHelper from '../../utils/DateHelper'

/** RESP: Excel Download Methods */
export default class TaskHandler {
  constructor (component, task) {
    this.$api = component.$api
    this.$set = component.$set
    this.task = task
  }

  async start (onFinished) {
    if (this.task.finished) {
      await this.export()
    } else {
      await this.prepareDownload()
      await this.beforeDownload()
      await this.download()
      await this.afterDownload()

      await this.prepareExport()
      await this.beforeExport()
      await this.export()
      await this.afterExport()
    }

    if (onFinished) {
      onFinished(this.task)
    }
  }

  async prepareDownload () {
    let task = this.task
    task.file_name = task.file_name + ' ' + DateHelper.date2strYMDHMS(new Date())
  }

  async beforeDownload () {}

  async download () {
    if (!this.task) {
      return
    }

    if (!this.task.requests) {
      this.$set(this.task, 'progress', 100)
      return
    }

    let task = this.task

    let totalProgress = task.requests.length + 1
    let curProgress = 1

    this.$set(task, 'loading', 'Loading Excel Structure ..')
    this.$set(task, 'progress', curProgress / totalProgress * 100)

    if (task.view_name) {
      await this.$api.predefinedScreener.getView(task.view_name).then(res => {
        if (!res) return
        task.view = res
      })
    }

    for (let i = 0; i < task.requests.length; i++) {
      let request = task.requests[i]

      if (!request || request.retry > 2) {
        continue
      }

      this.$set(task, 'loading', 'Fetching Data ' + curProgress + '/' + totalProgress + ' ..')
      this.$set(task, 'progress', curProgress / totalProgress * 100)

      await this.$api[request.service][request.func].apply(this.$api[request.service], request.params).then(res => {
        if (!res) return
        if (!task.data) { task.data = [] }

        if (res.data) {
          task.data = task.data.concat(res.data)
        } else if (res.data) {
          task.data = task.data.concat(res)
        }

        if (request.callback) {
          let finished = request.callback(task.requests, i, res)
          if (finished) {
            curProgress++
          }
        } else {
          curProgress++
        }
      }).catch(err => {
        // ADD TASK BACK TO QUEUE IF REQUEST TIMEOUT
        if (
          // TIME OUT ERROR, RETRY
          (err + '').indexOf('timeout') > -1
        ) {
          if (!request.retry) {
            request.retry = 0
          }
          request.retry++
          task.requests.push(request)
        }
      })
    }

    this.$set(task, 'loading', false)
    this.$set(task, 'progress', 100)
  }

  async afterDownload () {}

  async prepareExport () {
    let task = this.task

    if (task.sheets) {
      return
    }

    let hideFields = ['id', 'is_realtime', 'guru_id', 'stockid', 'status', 'updated_at', 'created_at', 'Picture']
    let exData = []
    let preHead = []
    let head = []
    let fields = []

    if (task.view && task.view.fields) {
      let getField = (field) => {
        if (!field) {
          return
        }
        if (field.field_type === 'group' && field.children && field.children.length > 0) {
          preHead.push(field.display_name)
          for (let i = 0; i < field.children.length - 1; i++) {
            preHead.push('')
          }
          field.children.forEach(child => {
            getField(child)
          })
          return
        }
        head.push(field.display_name)
        fields.push(field.field_name)
      }

      task.view.fields.forEach(field => {
        getField(field)
      })
    } else if (task.data && task.data.length > 0) {
      Object.keys(task.data[0]).forEach(key => {
        if (hideFields.indexOf(key) === -1 &&
            typeof (task.data[0][key]) !== 'object' &&
            !Array.isArray(task.data[0][key])
        ) {
          head.push(key); fields.push(key)
        }
      })
    }

    exData.push(preHead)
    exData.push(head)

    if (task.data && task.data.length > 0) {
      task.data.forEach(row => {
        let rowData = []
        fields.forEach(key => {
          rowData.push(this.handleField(row, key))
        })
        exData.push(rowData)
      })
    }

    task.export_data = exData
  }

  async beforeExport () {
    let task = this.task

    if (task.sheets) {
      return
    }

    let head = task.export_data[0]
    let curDate = DateHelper.date2strYMD(new Date())
    let infoLine1 = ['Downloaded from https://www.gurufocus.com', curDate]
    let infoLine2 = ['File Name', task.file_name]
    let empLine = []

    while (infoLine1.length < head.length) {
      infoLine1.push('')
    }
    while (infoLine2.length < head.length) {
      infoLine2.push('')
    }
    while (empLine.length < head.length) {
      empLine.push('')
    }

    task.export_data.unshift(empLine)
    task.export_data.unshift(infoLine2)
    task.export_data.unshift(infoLine1)

    /** TO NUMBER IF POSSIBLE */
    task.export_data.forEach(row => {
      for (let i = 0; i < row.length; i++) {
        let cell = row[i]
        if (!isNaN(parseFloat(cell)) && isFinite(cell)) {
          row[i] = +cell
        }
      }
    })
  }

  async export () {
    if (this.task.to_csv) {
      const blob = ExcelHelper.export_json_to_csv(this.task.export_data, this.task.file_name)
      this.$set(this.task, 'blob', blob)
    } else if (this.task.sheets){
      const blob = ExcelHelper.export_json_to_excel_sheets(this.task.sheets, this.task.export_data, this.task.file_name)
      this.$set(this.task, 'blob', blob)
    } else {
      const blob = ExcelHelper.export_json_to_excel_sheets(['Sheet1'], [this.task.export_data], this.task.file_name)
      this.$set(this.task, 'blob', blob)
    }
  }

  async afterExport () {
    this.task.finished = true
  }

  handleField (data, key) {
    if (key === 'change') {
      switch (data[key]) {
        case 10000:
          return 'New Buy'
        case -10000:
          return 'Sold Out'
        case 9999:
          return 'Buy to Cover'
        case -9999:
          return 'Sell Short'
      }
    }

    if (key === 'price') {
      if (data.currency_symbol && data.currency_symbol.currency_symbol) {
        return data.currency_symbol.currency_symbol + data[key]
      }
    }

    if (key === 'symbol' || key === 'exchange' || key === 'display_symbol') {
      if (data['class'] && (data['class'] === 'call' || data['class'] === 'put')) {
        return data[key] + ' (' + data['class'] + ')'
      }
    }

    if (key === 'symbol') {
      if (data['display_symbol']) {
        return data['display_symbol']
      } else if (data['exchange'] && data['symbol']) {
        return `${data['exchange']}:${data['symbol']}`
      } else {
        return data['symbol']
      }
    }

    return data[key]
  }
}

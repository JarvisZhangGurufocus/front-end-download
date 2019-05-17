export default class {
  static getServerData () {
    let element = document.getElementById('server-data')
    if (!element) {
      return null
    }

    let content = this.jsonParse(element.innerHTML)
    if (!content) {
      return null
    }
    if (typeof(content) !== 'object') {
      return null
    }
    if (Object.keys(content).length === 0) {
      return null
    }

    Object.keys(content).forEach(key => {
      content[key] = this.jsonParse(content[key])
    })

    if (!content.task) {
      return null
    }

    this.assignFunc(content.task, content.func)

    return content.task
  }

  static jsonParse (string) {
    try {
      return JSON.parse(string)
    } catch (err) {
      console.log(err)
    }
    return string
  }

  static assignFunc(task, func) {
    if (!task || !func) {
      return task
    }

    if (Array.isArray(task)) {
      return this.assignFuncArray(task, func)
    }

    if (typeof(task) === 'object') {
      return this.assignFuncObject(task, func)
    }

    if (typeof(task) === 'string' && task.startsWith('func-') && func[task]) {
        return eval(`(${func[task]})`)
    }
  }

  static assignFuncArray(task, func) {
    task.forEach((item, idx) => {
      if (typeof(item) === 'string' && item.startsWith('func-') && func[item]) {
        task.splice(idx, 1, eval(`(${func[item]})`))
      } else {
        this.assignFunc(item, func)
      }
    })
  }

  static assignFuncObject(task, func) {
    Object.keys(task).forEach(key => {
      const item = task[key]
      if (typeof(item) === 'string' && item.startsWith('func-') && func[item]) {
        task[key] = eval(`(${func[item]})`)
      } else {
        this.assignFunc(item, func)
      }
    })
  }
}
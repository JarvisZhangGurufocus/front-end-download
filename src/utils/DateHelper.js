export default class DateHelper {
  static date2strYM (date) {
    if (!date) {
      date = new Date()
    }
    try {
      date = new Date(date)
      date.toISOString()
    } catch (e) {
      return ''
    }
    var iso = date.toISOString()
    var year = iso.substr(0, 4)
    var month = iso.substr(5, 2)
    return year + '-' + month
  }

  static date2strYMD (date) {
    if (!date) {
      date = new Date()
    }
    try {
      date = new Date(date)
      date.toISOString()
    } catch (e) {
      return ''
    }
    var iso = date.toISOString()
    var year = iso.substr(0, 4)
    var month = iso.substr(5, 2)
    var day = iso.substr(8, 2)
    return year + '-' + month + '-' + day
  }

  static date2strMDY (date) {
    if (!date) {
      date = new Date()
    }
    try {
      date = new Date(date)
      date.toISOString()
    } catch (e) {
      return ''
    }
    var iso = date.toISOString()
    var year = iso.substr(0, 4)
    var month = iso.substr(5, 2)
    var day = iso.substr(8, 2)
    return month + '-' + day + '-' + year
  }

  static date2strYMDHMS (date) {
    if (!date) {
      date = new Date()
    }
    try {
      date = new Date(date).toISOString()
    } catch (e) {
      return ''
    }

    return date.substr(0, 10) + ' ' + date.substr(11, 8)
  }

  static formatDate (d) {
    if (!d) return ''

    try {
      d = new Date(d)
      d.toISOString()
    } catch (e) {
      return ''
    }

    var now = Date.now()
    var diff = (now - d) / 1000

    if (diff < 30) {
      return 'just now'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + ' minutes ago'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + ' hours ago'
    } else if (diff < 3600 * 24 * 7) {
      return Math.ceil(diff / (3600 * 24)) + ' days ago'
    } else if (diff < 3600 * 24 * 7 * 4) {
      return Math.ceil(diff / (3600 * 24 * 7)) + ' weeks ago'
    } else if (diff < 3600 * 24 * 365) {
      return Math.ceil(diff / (3600 * 24 * 30)) + ' months ago'
    } else if (!isNaN(d.getTime())) {
      return d.toISOString().substr(0, 10)
    } else {
      return ''
    }
  }

  static getLastQuarters (n) {
    if (!n) {
      n = 1
    }

    var date = new Date()
    date.setUTCMonth(date.getUTCMonth() - (n - 1) * 3)

    var month = date.getUTCMonth() + 1

    if (month >= 1 && month <= 3) {
      date.setUTCMonth(2)
      date.setDate(31)
    } else if (month >= 4 && month <= 6) {
      date.setUTCMonth(5)
      date.setDate(30)
    } else if (month >= 7 && month <= 9) {
      date.setUTCMonth(8)
      date.setDate(30)
    } else {
      date.setUTCMonth(11)
      date.setDate(31)
    }

    return this.date2strYMD(date)
  }

  static date2Quarter (date) {
    date = new Date(date)
    var res = date.getUTCFullYear() + 'Q'
    var month = date.getUTCMonth() + 1

    if (month <= 3) {
      res += '1'
    } else if (month <= 6) {
      res += '2'
    } else if (month <= 9) {
      res += '3'
    } else {
      res += '4'
    }
    return res
  }

  static formatAMPM (date) {
    date = new Date(date)
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours || 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    var strTime = hours + ':' + minutes + ampm
    return strTime
  }

  static dateAddPeriod (date, num, type) {
    if (!num || !type || !date) { return date }

    num = +num

    switch (type) {
      case 'day':
      case 'days':
        date.addDays(num)
        break
      case 'week':
      case 'weeks':
        date.addDays(num * 7)
        break
      case 'month':
      case 'months':
        date.setUTCMonth(date.getUTCMonth() + num)
        break
      case 'year':
      case 'years':
        date.setUTCFullYear(date.getUTCFullYear() + num)
        break
      default:
        date.setUTCMonth(date.getUTCMonth() + num)
        break
    }
    return date
  }

  static isLastDay (dt) {
    var test = new Date(dt.getTime())
    test.setDate(test.getDate() + 1)
    return test.getDate() === 1
  }

  static getDate (str) {
    let parts = str.split('-')
    return new Date(parts[0], parts[1] - 1, parts[2])
  }

  static getLastDay (year, month) {
    return new Date(year, month, 0)
  }
}

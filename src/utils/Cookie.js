
import Cookie from 'js-cookie'

export default class {

  static get (key) {
    let value = Cookie.get(key)

    if (!isNaN(value)) {
      return +value
    }

    if (value === 'false') {
      return false
    }

    return value
  }

  static set (key, value, args) {
    if (value === null) {
      value = false
    }
    if (value === undefined) {
      value = false
    }

    return Cookie.set(key, value, args)
  }
}

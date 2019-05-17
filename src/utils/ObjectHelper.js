export default class ObjectHelper {
  static isEmpty (obj) {
    if (!obj) return true
    if (
      (typeof obj === 'undefined' ? 'undefined' : typeof (obj)) === 'object' &&
      Object.keys(obj).length === 0
    ) { return true }
    if (Array.isArray(obj) && obj.length === 0) return true
    return false
  }

  static pluckMatrixCols (matrix, cols) {
    if (!cols) {
      cols = []
    }
    var res = []

    matrix.forEach(function (row) {
      var resRow = []
      cols.forEach(function (idx) {
        resRow.push(row[idx])
      })
      res.push(resRow)
    })

    return res
  }

  static obj2Str (obj) {
    return JSON.stringify(obj, function (key, value) {
      return typeof value === 'function' ? value.toString() : value
    })
  }

  static pluck (arr, key) {
    var res = []
    arr.forEach(function (item) {
      if (item[key]) { res.push(item[key]) }
    })
    return res
  }

  static extractFunction (obj) {
    let funcs = {}

    if (!obj) {
      return funcs
    }

    let type = ''

    if (Array.isArray(obj)) {
      type = 'array'
    } else {
      type = typeof (obj)
    }

    switch (type) {
      case 'array':
        obj.forEach((child, idx) => {
          if (typeof (child) === 'function') {
            const key = 'func-' + lzString.compressToEncodedURIComponent(child.toString())
            funcs[key] = child.toString()
            obj.splice(idx, 1, key)
          } else {
            const childFuncs = this.extractFunction(child)
            Object.assign(funcs, childFuncs)
          }
        })
        break
      case 'object':
        Object.keys(obj).forEach(childKey => {
          const child = obj[childKey]
          if (typeof (child) === 'function') {
            const key = 'func-' + lzString.compressToEncodedURIComponent(child.toString())
            funcs[key] = child.toString()
            obj[childKey] = key
          } else {
            const childFuncs = this.extractFunction(child)
            Object.assign(funcs, childFuncs)
          }
        })
        break
      case 'function':
        const key = 'func-' + lzString.compressToEncodedURIComponent(obj.toString())
        funcs[key] = obj.toString()
        break
    }

    return funcs
  }

  static deepCopy (obj) {
    if (obj === null) {
      return obj
    }
    switch (typeof (obj)) {
      case 'object':
        var copy = null
        if (Array.isArray(obj)) {
          /** ARRAY */
          copy = []
          obj.forEach((item) => {
            copy.push(this.deepCopy(item))
          })
          return copy
        } else {
          /** OBJECT */
          copy = {}
          Object.keys(obj).forEach((key) => {
            copy[key] = this.deepCopy(obj[key])
          })
          return copy
        }
      case 'undefined':
      case 'function':
      default:
        /** OTHER */
        return obj
    }
  }

  static isEqual (val1, val2, depth, maxDepth) {
    if (depth === null || depth === undefined) {
      depth = 0
    }

    if (maxDepth === null || maxDepth === undefined) {
      maxDepth = 8
    }

    if (depth > maxDepth) {
      return true
    }

    if (!val1 && !val2) {
      return true
    }

    if (!val1 || !val2) {
      return false
    }

    if (typeof val1 !== typeof val2) {
      return false
    }

    switch (typeof val1) {
      case 'string':
      case 'boolean':
      case 'number':
        return val1 === val2
      default:
        if (Array.isArray(val1)) {
          return this.arrayEqual(val1, val2, depth, maxDepth)
        } else {
          return this.objectEqual(val1, val2, depth, maxDepth)
        }
    }
  }

  static arrayEqual (val1, val2, depth, maxDepth) {
    if (depth === null || depth === undefined) {
      depth = 0
    }

    if (maxDepth === null || maxDepth === undefined) {
      maxDepth = 8
    }

    if (depth > maxDepth) {
      return true
    }

    if (val1.length !== val2.length) {
      return false
    }

    var _val1 = this.deepCopy(val1).sort()
    var _val2 = this.deepCopy(val2).sort()

    var equal = true

    for (var i = 0; i < _val1.length && equal; i++) {
      if (!this.isEqual(_val1[i], _val2[i], depth + 1, maxDepth)) {
        equal = false
      }
    }
    return equal
  }

  static objectEqual (val1, val2, depth, maxDepth) {
    if (depth === null || depth === undefined) {
      depth = 0
    }

    if (maxDepth === null || maxDepth === undefined) {
      maxDepth = 8
    }

    if (depth > maxDepth) {
      return true
    }

    var equal = true
    var keys1 = Object.keys(val1).sort()
    var keys2 = Object.keys(val2).sort()

    if (keys1.length !== keys2.length) {
      return false
    }

    for (var i = 0; i < keys1.length && equal; i++) {
      if (keys1[i] !== keys2[i]) {
        equal = false
      }

      if (!this.isEqual(val1[keys1[i]], val2[keys2[i]], depth + 1, maxDepth)) {
        equal = false
      }
    }

    return equal
  }
}

export default class LRUCache {
  /**
   * cacheTime in seconds
   * maxSize cache pool
   */
  constructor (cacheTime, maxSize) {
    this.cacheTime = cacheTime || 60 * 15
    this.curSize = 0
    this.maxSize = maxSize || 200
    this.cacheRoot = null
  }

  get (key) {
    if (!this.cacheRoot) {
      return null
    }

    let node = this.cacheRoot
    while (node) {
      if (node.key === key) {
        this.moveToTop(node)
        return JSON.parse(JSON.stringify(node.value))
      }
      node = node.next
    }

    return null
  }

  set (key, value) {
    const node = new CacheNode(key, value)
    if (this.cacheRoot) {
      node.setNext(this.cacheRoot)
    }
    this.curSize++
    this.cacheRoot = node

    this.checkSize()
    this.checkExpire()
  }

  moveToTop (node) {
    if (node === this.cacheRoot) {
      return
    }
    if (node.prev) {
      node.prev.next = node.next
    }
    if (node.next) {
      node.next.prev = node.prev
    }
    if (this.cacheRoot) {
      node.setNext(this.cacheRoot)
    } else {
      node.next = null
    }
    node.prev = null
    this.cacheRoot = node
  }

  checkSize () {
    if (!this.cacheRoot || this.curSize <= this.maxSize) {
      return
    }

    let i = 0
    let node = this.cacheRoot
    while (node && i < this.maxSize / 2) {
      i++
      node = node.next
    }

    if (node) {
      node.next = null
    }

    this.curSize = i
  }

  checkExpire () {
    if (!this.cacheRoot) {
      return
    }
    let node = this.cacheRoot
    let curTime = Math.floor(new Date().getTime() / 1000)
    while (node) {
      if (curTime - node.time > this.cacheTime) {
        if (node === this.cacheRoot) {
          this.cacheRoot = node.next
        }
        if (node.prev) {
          node.prev.next = node.next
        }
        if (node.next) {
          node.next.prev = node.prev
        }
        this.curSize--
      }

      node = node.next
    }
  }

  removeLike (reg) {
    if (!this.cacheRoot) {
      return
    }
    if (!(reg instanceof RegExp)) {
      reg = new RegExp(reg, 'g')
    }
    let node = this.cacheRoot
    while (node) {
      if (reg.test(node.key)) {
        if (node === this.cacheRoot) {
          this.cacheRoot = node.next
        }
        if (node.prev) {
          node.prev.next = node.next
        }
        if (node.next) {
          node.next.prev = node.prev
        }
        this.curSize--
      }
      node = node.next
    }
  }
}

class CacheNode {
  constructor (key, value) {
    this.key = key
    this.value = value
    this.time = Math.floor(new Date().getTime() / 1000)
  }

  setNext (node) {
    this.next = node
    node.prev = this
  }

  setPrev (node) {
    this.prev = node
    node.next = this
  }
}

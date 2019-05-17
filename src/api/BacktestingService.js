import { CancelToken } from 'axios'

export default class FileService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  backtesting (type, params, cancelKey = 'backtesting') {
    if (this.$cancelQueue[cancelKey]) {
      this.$cancelQueue[cancelKey].cancel()
    }
    this.$cancelQueue[cancelKey] = CancelToken.source()

    return this.$axios({
      url: '/_api/backtesting/' + type,
      method: 'post',
      data: params,
      cancelToken: this.$cancelQueue[cancelKey] && this.$cancelQueue[cancelKey].token
    })
  }
}

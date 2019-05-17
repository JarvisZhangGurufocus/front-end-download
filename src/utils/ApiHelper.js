import { CancelToken } from 'axios'
import { Notification } from 'element-ui'

import EncryptHelper from '../utils/EncryptHelper'

const https = require('https')
const axiosInterceptorSkipUrls = [
  '/_api/oauth/token',
  '/oauth/token',
  '/oauth/client',
  '/_api/time',

  '_api/oauth/token',
  'oauth/token',
  'oauth/client',
  '_api/time'
]

export default class ApiHelper {
  constructor (ctx) {
    this.$axios = ctx.$axios
    this.$cancelQueue = {}
  }

  /** RESP: Request Middleware */
  async requestMiddleware (req, apiService) {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false })
    req.httpsAgent = httpsAgent

    let url = req.url.split('?')[0]

    await apiService.apiHelper.cancelToken(req)

    if (['_api/time', '/_api/time'].indexOf(req.url) === -1) {
      const time = await apiService.apiHelper.getServerTime(apiService)
      req.headers.Signature = EncryptHelper.encrypt(url, time)
    }

    return req
  }

  /** RESP: Response Middleware */
  async responseMiddleware (response) {
    if (response && response.config && response.config.url && response.config.baseURL) {
      let url = response.config.url.replace(response.config.baseURL, '')
      if (axiosInterceptorSkipUrls.indexOf(url) > -1) {
        return response
      }
    }

    return response && response.data ? response.data : response
  }

  /** RESP: Request Error Handler */
  async responseError (error, apiService) {
    if (!error || !apiService) { return }

    if (error.constructor && error.constructor.name === 'Cancel') {
      throw new Error('Request Canceled')
    }

    if (error.response) {
      /** skip it when request was sent to "www.gurufocus.com/_api" instead of "www.gurufocus.com/reader/_api" */
      if (error.response.request && error.response.request.responseURL && error.response.request.responseURL.indexOf('reader') > -1) {
        let title = error && error.response && error.response.status ? error.response.status : 'Error Happened'
        let message = error && error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Request error'
        Notification({ title: title, message: message, type: 'error' })
      }
    }

    let errorMessage = {
      statusCode: 500,
      message: error.toString(),
      url: ''
    }

    if (error && error.config && error.config.url) {
      errorMessage.url = error.config.url.replace(error.config.baseURL, '')
    }

    if (error && error.response && error.response.status) {
      errorMessage.statusCode = error.response.status
    }

    if (error && error.response && error.response.data && error.response.data.error) {
      errorMessage.message = error.response.data.error
    }

    throw errorMessage
  }

  async getServerTime (apiService) {
    let clientTime = Math.floor(new Date().getTime() / 1000)
    let timeDiff = clientTime - apiService.serverTime
    if (timeDiff <= 0 || timeDiff > 120) {
      // SYNC
      let newserverTime = await this.$axios({ url: '/_api/time', method: 'get' }).catch(err => { console.log(err) })
      if (!newserverTime) {
        newserverTime = clientTime
      }
      if (newserverTime.data) {
        newserverTime = newserverTime.data
      }
      apiService.serverTime = newserverTime
    } else if (timeDiff <= 60) {
      // SKIP
    } else if (timeDiff <= 120) {
      // ASYNC
      await this.$axios({ url: '/_api/time', method: 'get' }).then(serverTime => {
        if (!serverTime) {
          serverTime = clientTime
        }
        if (serverTime.data) {
          serverTime = serverTime.data
        }
        apiService.serverTime = serverTime
      }).catch(err => {
        console.log(err)
      })
    }

    return apiService.serverTime
  }

  async cancelToken (request) {
    if (!request || !request.cancelKey) {
      return
    }

    const cancelKey = request.cancelKey

    if (this.$cancelQueue[cancelKey]) {
      this.$cancelQueue[cancelKey].cancel()
    }

    this.$cancelQueue[cancelKey] = CancelToken.source()

    request.cancelToken = this.$cancelQueue[cancelKey] && this.$cancelQueue[cancelKey].token
  }
}

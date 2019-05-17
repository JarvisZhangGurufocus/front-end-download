import AdminService from './AdminService'
import AlertService from './AlertService'
import BacktestingService from './BacktestingService'
import FileService from './FileServices'
import FinancialService from './FinancialService'
import GuruGroupService from './GuruGroupService'
import GuruService from './GuruService'
import InsiderService from './InsiderService'
import InteractiveChartService from './InteractiveChartService'
import MessageService from './MessageService'
import NoteService from './NoteService'
import PortfolioService from './PortfolioService'
import PredefinedScreenerService from './PredefinedScreenerService'
import ReportService from './ReportService'
import ScreenerService from './ScreenerService'
import SearchService from './SearchService'
import StockService from './StockService'
import UserScreenerService from './UserScreenerService'
import UserService from './UserService'
import IntroService from './IntroService'

import ApiHelper from '../utils/ApiHelper'

export default class ApiService {
  constructor (ctx) {
    this.$axios = ctx.$axios

    this.apiHelper = new ApiHelper(ctx)

    this.$axios.interceptors.request.use((req) => this.apiHelper.requestMiddleware(req, this))
    this.$axios.interceptors.response.use((res) => this.apiHelper.responseMiddleware(res, this), (err) => this.apiHelper.responseError(err, this))
  }

  getCatchOrFetch (service, func, cacheTime, ...args) {
    let cacheKey = 'api:' + service + ':' + func
    let cached = null
    if (typeof localStorage !== 'undefined') {
      cached = localStorage.getItem(cacheKey)
    }
    let curTimestamp = new Date().getTime()

    if (cached) {
      try {
        /** Get Cache */
        cached = JSON.parse(cached)
        if (
          (cached.data && cached.timestamp) && // Validation Check
          (cacheTime === 0 || curTimestamp - cached.timestamp <= cacheTime) // Expired Check
        ) {
          return new Promise((resolve) => {
            resolve(cached.data)
          })
        }
      } catch (err) {
        return err
      }
    }
    /** Fetch */
    return new Promise((resolve) => {
      this[service][func].apply(this[service], args).then(response => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: curTimestamp, data: response
          }))
        }
        resolve(response)
      })
    })
  }

  get admin () {
    if (!this.adminService) {
      this.adminService = new AdminService({ $axios: this.$axios })
    }
    return this.adminService
  }

  get alerts () {
    if (!this.alerrtService) {
      this.alertService = new AlertService({ $axios: this.$axios })
    }
    return this.alertService
  }

  get backtesting () {
    if (!this.backtestingService) {
      this.backtestingService = new BacktestingService({ $axios: this.$axios })
    }
    return this.backtestingService
  }

  get files () {
    if (!this.fileService) {
      this.fileService = new FileService({ $axios: this.$axios })
    }
    return this.fileService
  }

  get financials () {
    if (!this.financialService) {
      this.financialService = new FinancialService({ $axios: this.$axios })
    }
    return this.financialService
  }

  get groups () {
    if (!this.guruGroupService) {
      this.guruGroupService = new GuruGroupService({ $axios: this.$axios })
    }
    return this.guruGroupService
  }

  get gurus () {
    if (!this.guruService) {
      this.guruService = new GuruService({ $axios: this.$axios })
    }
    return this.guruService
  }

  get insiders () {
    if (!this.insiderService) {
      this.insiderService = new InsiderService({ $axios: this.$axios })
    }
    return this.insiderService
  }

  get interactiveChart () {
    if (!this.interactiveChartService) {
      this.interactiveChartService = new InteractiveChartService({ $axios: this.$axios })
    }
    return this.interactiveChartService
  }

  get messages () {
    if (!this.messageService) {
      this.messageService = new MessageService({ $axios: this.$axios })
    }
    return this.messageService
  }

  get notes () {
    if (!this.noteService) {
      this.noteService = new NoteService({ $axios: this.$axios })
    }
    return this.noteService
  }

  get portfolio () {
    if (!this.portfolioService) {
      this.portfolioService = new PortfolioService({ $axios: this.$axios })
    }
    return this.portfolioService
  }

  get predefinedScreener () {
    if (!this.predefinedScreenerService) {
      this.predefinedScreenerService = new PredefinedScreenerService({ $axios: this.$axios })
    }
    return this.predefinedScreenerService
  }

  get reports () {
    if (!this.reportService) {
      this.reportService = new ReportService({ $axios: this.$axios })
    }
    return this.reportService
  }

  get screener () {
    if (!this.screenerService) {
      this.screenerService = new ScreenerService({ $axios: this.$axios })
    }
    return this.screenerService
  }

  get search () {
    if (!this.searchService) {
      this.searchService = new SearchService({ $axios: this.$axios })
    }
    return this.searchService
  }

  get stocks () {
    if (!this.stockService) {
      this.stockService = new StockService({ $axios: this.$axios })
    }
    return this.stockService
  }

  get userScreener () {
    if (!this.userScreenerService) {
      this.userScreenerService = new UserScreenerService({ $axios: this.$axios })
    }
    return this.userScreenerService
  }

  get users () {
    if (!this.userService) {
      this.userService = new UserService({ $axios: this.$axios })
    }
    return this.userService
  }

  get intros () {
    if (!this.introService) {
      this.introService = new IntroService({ $axios: this.$axios })
    }
    return this.introService
  }
}

import AllInOneScreenerHandler from './AllInOneScreenerHandler'
import BacktestingHandler from './BacktestingHandler'
import GuruTopHoldingsHandler from './GuruTopHoldingsHandler'
import GuruPortfolioHandler from './GuruPortfolioHandler'
import GuruScoreboardHandler from './GuruScoreBoardHandler'
import GurusPortfolioHandler from './GurusPortfolioHandler'
import GurusPortfolioCombineHandler from './GurusPortfolioCombineHandler'
import GroupLatestPicksHandler from './GroupLatestPicksHandler'
import InteractiveChartHandler from './InteractiveChartHandler'
import TaskHandler from './TaskHandler'

export default class TaskHandlerFactory {
  static getHandler (parent, task) {
    if (!task) {
      return TaskHandler
    }

    const handlers = {
      AllInOneScreenerHandler,
      BacktestingHandler,
      GuruTopHoldingsHandler,
      GuruPortfolioHandler,
      GuruScoreboardHandler,
      GurusPortfolioHandler,
      GurusPortfolioCombineHandler,
      GroupLatestPicksHandler,
      InteractiveChartHandler
    }

    if (handlers[ task.handler ]) {
      return new handlers[ task.handler ](parent, task)
    } else {
      return new TaskHandler(parent, task)
    }
  }
}

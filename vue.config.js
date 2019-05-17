module.exports = {
  chainWebpack: config => {
    config.output.chunkFilename(`js/front-end-download.[name].[id].[chunkhash:8].js`)
  }
}
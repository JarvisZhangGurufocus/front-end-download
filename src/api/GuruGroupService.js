export default class GuruGroupService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  getGroups (cancelKey = 'get_groups') {
    return this.$axios({
      url: '/_api/guru_groups',
      method: 'get',
      cancelKey
    })
  }

  createGroup (name, cancelKey = 'create_group') {
    return this.$axios({
      url: '/_api/guru_groups',
      method: 'post',
      data: { name },
      cancelKey: `${cancelKey}:${name}`,
      clearCache: '{/_api/guru_groups}'
    })
  }

  getGroupGurus (group, params, cancelKey = 'get_group_gurus') {
    return this.$axios({
      url: '/_api/guru_groups/' + group,
      method: 'get',
      params: params,
      cancelKey
    })
  }

  updateGroup (id, group, cancelKey = 'update_group') {
    return this.$axios({
      url: '/_api/guru_groups/' + id,
      method: 'put',
      data: group,
      cancelKey: `${cancelKey}:${id}`,
      clearCache: '/_api/guru_groups'
    })
  }

  deleteGroup (id, cancelKey = 'delete_group') {
    return this.$axios({
      url: '/_api/guru_groups/' + id,
      method: 'delete',
      cancelKey: `${cancelKey}:${id}`,
      clearCache: '/_api/guru_groups'
    })
  }

  getGroupScreener (screenerName, group, params, cancelKey = 'get_group_screener') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/screener/' + screenerName,
      method: 'get',
      params: params,
      cancelKey: `${cancelKey}:${screenerName}`
    })
  }

  getGroupTopHoldings (group, params, cancelKey = 'get_group_top_holdings') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/top10holdings',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getGroupGeographicTrends (group, cancelKey = 'get_group_geographic_trends') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/geographic_trends',
      method: 'get',
      cancelKey
    })
  }

  getGroupIndustryTrends (group, params, cancelKey = 'get_group_industry_trends') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/industry_trends',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getGroupEtfs (group, params, cancelKey = 'get_group_etfs') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/etfs',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getGroupScoreboard (group, params, cancelKey = 'get_group_scoreboard') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/scoreboard',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getGroupPortfolios (group, params, cancelKey = 'get_group_portfolios') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/portfolios',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getGroupLatestPicks (group, params, cancelKey = 'get_group_latest_picks') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/latest',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getGroupRealtimePicks (group, params, cancelKey = 'get_group_realtime_picks') {
    return this.$axios({
      url: '/_api/guru_groups/' + group + '/realtime',
      method: 'get',
      params: params,
      cancelKey
    })
  }

  getGroupShortPositions (params, cancelKey = 'get_group_short_positions') {
    return this.$axios({
      url: '/_api/guru_groups/short_positions',
      method: 'get',
      params: params,
      cancelKey
    })
  }
}

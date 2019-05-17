
export default class ReportService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  search (query, cancelKey = 'document_search') {
    return this.$axios({
      url: '/_api/documents/_search',
      method: 'post',
      data: { query: query },
      cancelKey
    })
  }

  // Report Info
  getReportParts (cancelKey = 'get_report_parts') {
    return this.$axios({
      url: '/data/report_parts.json',
      method: 'get',
      cancelKey
    })
  }

  getReportSections (id, cancelKey = 'get_report_sections') {
    return this.$axios({
      url: '/_api/documents/' + id + '/sections',
      method: 'get',
      cancelKey
    })
  }

  // Mark
  deleteMark (documentID, markID, cancelKey = 'delete_mark') {
    return this.$axios({
      url: '/_api/documents/' + documentID + '/marks/' + markID,
      method: 'delete',
      cancelKey: `${cancelKey}:${documentID}:${markID}`,
      clearCache: '{/_api/documents/_search}'
    })
  }

  // Table
  getTableByPath (documentID, tablePath, cancelKey = 'get_table_by_path') {
    return this.$axios({
      url: '/_api/documents/' + documentID + '/tables/' + tablePath,
      method: 'get',
      cancelKey: `${cancelKey}:${documentID}`
    })
  }

  searchTable (query, cancelKey = 'search_table') {
    return this.$axios({
      url: '/_api/document_tables/_search',
      method: 'post',
      data: { query: query },
      cancelKey
    })
  }

  // Query
  saveFilter (filter, cancelKey = 'save_filter') {
    return this.$axios({
      url: '/_api/documents/filters',
      method: 'post',
      data: { filter: filter },
      cancelKey,
      clearCache: '{/_api/documents/filters}'
    })
  }

  getFilters () {
    return this.$axios({
      url: '/_api/documents/filters',
      method: 'get'
    })
  }

  deleteFilter (id, cancelKey = 'delete_filter') {
    return this.$axios({
      url: '/_api/documents/filters/' + id,
      method: 'delete',
      cancelKey: `${cancelKey}:${id}`,
      clearCache: '{/_api/documents/filters}'
    })
  }

  // keywords
  getIndustryKeywords (cancelKey = 'get_industry_keywords') {
    return this.$axios({
      url: '/data/industry_keywords.json',
      method: 'get',
      cancelKey
    })
  }
}

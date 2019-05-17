import XLSX from 'xlsx'
import FileSaver from 'file-saver'

class Workbook {
  constructor () {
    this.SheetNames = []
    this.Sheets = {}
  }
}

export default class ExcelHelper {
  static generateArray (table) {
    var out = []
    var rows = table.querySelectorAll('tr')
    var ranges = []
    for (var R = 0; R < rows.length; ++R) {
      var outRow = []
      var row = rows[R]
      var columns = row.querySelectorAll('td')
      for (var C = 0; C < columns.length; ++C) {
        var cell = columns[C]
        var colspan = cell.getAttribute('colspan')
        var rowspan = cell.getAttribute('rowspan')
        var cellValue = cell.innerText
        // eslint-disable-next-line
        if (cellValue !== '' && cellValue == +cellValue) cellValue = +cellValue

        // Skip ranges
        ranges.forEach(function (range) {
          if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
            for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null)
          }
        })

        // Handle Row Span
        if (rowspan || colspan) {
          rowspan = rowspan || 1
          colspan = colspan || 1
          ranges.push({ s: { r: R, c: outRow.length }, e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 } })
        }
        ;

        // Handle Value
        outRow.push(cellValue !== '' ? cellValue : null)

        // Handle Colspan
        if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null)
      }
      out.push(outRow)
    }
    return [out, ranges]
  };

  static datenum (v, date1904) {
    if (date1904) v += 1462
    var epoch = Date.parse(v)
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
  }

  // eslint-disable-next-line
  static sheet_from_array_of_arrays (data, opts) {
    var ws = {}
    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } }
    for (var R = 0; R !== data.length; ++R) {
      for (var C = 0; C !== data[R].length; ++C) {
        if (range.s.r > R) range.s.r = R
        if (range.s.c > C) range.s.c = C
        if (range.e.r < R) range.e.r = R
        if (range.e.c < C) range.e.c = C
        var cell = { v: data[R][C] }
        if (cell.v == null) continue
        var cellRef = XLSX.utils.encode_cell({ c: C, r: R })

        if (typeof cell.v === 'number') cell.t = 'n'
        else if (typeof cell.v === 'boolean') cell.t = 'b'
        else if (cell.v instanceof Date) {
          cell.t = 'n'
          cell.z = XLSX.SSF._table[14]
          cell.v = ExcelHelper.datenum(cell.v)
        } else cell.t = 's'

        ws[cellRef] = cell
      }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
    return ws
  }

  static s2ab (s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }

  // eslint-disable-next-line
  static export_table_to_excel (id) {
    var theTable = document.getElementById(id)
    var oo = ExcelHelper.generateArray(theTable)
    var ranges = oo[1]

    /* original data */
    var data = oo[0]
    var wsName = 'SheetJS'

    var wb = new Workbook(); var ws = ExcelHelper.sheet_from_array_of_arrays(data)

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges

    /* add worksheet to workbook */
    wb.SheetNames.push(wsName)
    wb.Sheets[wsName] = ws

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })

    FileSaver.saveAs(new Blob([ExcelHelper.s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx')
  }

  // eslint-disable-next-line
  static export_json_to_excel (th, jsonData, defaultTitle) {
    /* original data */
    var data = jsonData
    var wsName = 'SheetJS'
    var wb = new Workbook(); var ws = ExcelHelper.sheet_from_array_of_arrays(data)

    /* 设置worksheet每列的最大宽度 */
    const colWidth = data.map(row => row.map(val => {
      var res = { 'wch': 10 }
      if (val == null) {
        /* 先判断是否为null/undefined */
        res = { 'wch': 10 }
      } else {
        res = { 'wch': val.toString().length }
      }

      if (res.wch > 30) {
        res.wch = 30
      } else if (res.wch < 10) {
        res.wch = 10
      }

      return res
    }))
    /* 以第一行为初始值 */
    let result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j] && colWidth[i] && colWidth[i][j] && result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch']
        }
      }
    }
    ws['!cols'] = result

    /* add worksheet to workbook */
    wb.SheetNames.push(wsName)
    wb.Sheets[wsName] = ws

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
    var title = defaultTitle || 'excel-list'
    var blob = new Blob([ExcelHelper.s2ab(wbout)], { type: 'application/vnd.ms-excel' })
    FileSaver.saveAs(blob, title + '.xlsx')
  }

  // eslint-disable-next-line
  static export_json_to_csv (jsonData, defaultTitle) {
    var ws = XLSX.utils.json_to_sheet(jsonData)
    var wbout = XLSX.utils.sheet_to_csv(ws)
    var blob = new Blob([ ExcelHelper.s2ab(wbout) ], { type: 'application/octet-stream' })
    FileSaver.saveAs(blob, defaultTitle + '.csv')
    return blob
  }

  // eslint-disable-next-line
  static export_json_to_excel_sheets (th, jsonData, defaultTitle) {
    /* original data */
    var wb = new Workbook()

    for (let i = 0; i < jsonData.length; i++) {
      var data = jsonData[i]
      var wsName = th[i].substring(0, 30)

      var ws = ExcelHelper.sheet_from_array_of_arrays(data)

      /* 设置worksheet每列的最大宽度 */
      const colWidth = data.map(row => row.map(val => {
        var res = { 'wch': 10 }
        if (val == null) {
          /* 先判断是否为null/undefined */
          res = { 'wch': 10 }
        } else {
          res = { 'wch': val.toString().length }
        }

        if (res.wch > 30) {
          res.wch = 30
        } else if (res.wch < 10) {
          res.wch = 10
        }
        return res
      }))

      /* 以第一行为初始值 */
      let result = colWidth[0]
      for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
          if (result[j] && colWidth[i] && colWidth[i][j] && result[j]['wch'] < colWidth[i][j]['wch']) {
            result[j]['wch'] = colWidth[i][j]['wch']
          }
        }
      }
      ws['!cols'] = result

      /* add worksheet to workbook */
      wb.SheetNames.push(wsName)
      wb.Sheets[wsName] = ws
    }

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
    var title = defaultTitle || 'excel-list'
    var blob = new Blob([ ExcelHelper.s2ab(wbout) ], { type: 'application/vnd.ms-excel' })
    FileSaver.saveAs(blob, title + '.xlsx')

    return blob
  }

  // eslint-disable-next-line
  static export_port_to_excel (id) {
    var theTable = $('#' + id).find('.gf-table__table-wrapper')[0]
    var oo = this.gfTableData2Array(theTable)
    var ranges = oo[1]
    /* original data */
    var data = oo[0]
    var wsName = 'SheetJS'

    var wb = new Workbook(); var ws = ExcelHelper.sheet_from_array_of_arrays(data)
    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges

    /* add worksheet to workbook */
    wb.SheetNames.push(wsName)
    wb.Sheets[wsName] = ws

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })

    FileSaver.saveAs(new Blob([ExcelHelper.s2ab(wbout)], { type: 'application/octet-stream' }), 'GuruFocus-Portfolio-' + moment().format('YYYY-MM-DD') + '.xlsx')
  }

  static gfTableData2Array (gfTable) {
    if (!gfTable) return []
    var out = []
    var rows = $(gfTable).find('tr.gf-table__row')
    var ranges = []
    for (var R = 0; R < rows.length; ++R) {
      var outRow = []
      var row = rows[R]
      var columns = row.querySelectorAll('td.gf-table__cell')
      var headers = $(row).find('th:not(.is-leaf)')
      for (var C = 0; C < columns.length; ++C) {
        var cell = columns[C]
        var colspan = cell.getAttribute('colspan')
        var rowspan = cell.getAttribute('rowspan')
        var cellValue = cell.innerText
        // eslint-disable-next-line
        if (cellValue !== '' && cellValue == +cellValue) cellValue = +cellValue

        // Skip ranges
        ranges.forEach(function (range) {
          if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
            for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null)
          }
        })

        // Handle Row Span
        if (rowspan || colspan) {
          rowspan = rowspan || 1
          colspan = colspan || 1
          ranges.push({ s: { r: R, c: outRow.length }, e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 } })
        }
        ;

        // Handle Value
        outRow.push(cellValue !== '' ? cellValue : null)

        // Handle Colspan
        if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null)
      }
      out.push(outRow)
      outRow = []
      if (out[0].length === 0) {
        for (var H = 0; H < headers.length; ++H) {
          var header = headers[H]
          var headerValue = header.innerText
          outRow.push(headerValue !== '' ? headerValue : null)
        }
        out[0] = outRow
      }
    }
    return [out, ranges]
  }
}

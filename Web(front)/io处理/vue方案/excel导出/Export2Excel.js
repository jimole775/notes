/* eslint-disable */
require('script-loader!file-saver');
import XLSX from 'xlsx'

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };

  // 如果头部数据超过两行，就需要进行合并头部的处理
  if (Object.prototype.toString.call(opts.header[0]) === "[object Array]" && opts.header.length > 1) {
    const { mergeRules, xlsxData } = transformHeader(opts.header)
    let loop = opts.header.length
    while(loop--) {
      data.unshift(opts.header[loop]) // 把 表头 数据 插到 表身数据的前面
    }
    ws['!merges'] = mergeRules; // 赋值 合并规则
  } else if (Object.prototype.toString.call(opts.header[0]) === "[object Array]" && opts.header.length === 1){
    data.unshift(opts.header[0]) // 把 表头 数据 插到 表身数据的前面
  } else {
    data.unshift(opts.header)
  }

  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;

      /** 计算出裁剪范围 */
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });
      /** 
       * "cell.t" 单元格数据类型 
       * 1. 'n' = number
       * 2. 'b' = boolean
       * 3. 's' = string
       */ 
      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';
      ws[cell_ref] = cell;
    }
  }
  // ws['!ref'] ref属性可以设置裁剪范围
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

export function export_json_to_excel({
  header,
  data,
  filename,
  autoWidth = true,
  bookType = 'xlsx'
} = {}) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]
  var ws_name = "SheetJS";
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data, {
      header: header // 分开处理表头数据
    });

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val === null) {
        return {
          'wch': 10
        };
      } else {
        let len = 0
        let valString = val.toString().trim()
        for(let i = 0; i < valString.length; i++) {
          // 如果是中文，就设置为 2 个单位宽度
          if (valString[i].charCodeAt(0) > 255) {
            len += 2
          } else {
            len += 1
          }
        }
        return {
          'wch': len
        };
      }
    }))
    /*以表头的最后一行为初始值*/
    let result = colWidth[header.length - 1];
    for (let i = 0; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);
}

/**
 * 处理头部数据，主要对多层头进行合并的计算
 * @param {Array} rowsData
 * @return {Object} { mergeRules: [{},{}], xlsxData: {} } 
 */
function transformHeader(rowsData) {
  const { originRows, newRows } = mergeRow(mergeCol(rowsData))
  return { mergeRules: countMergeRules(newRows), xlsxData: toXlsx(originRows) } 

  function mergeCol(originRows) {
    const newRows = []
    for (let rowLoop = 0; rowLoop < originRows.length; rowLoop++) {
      const rowItems = originRows[rowLoop]
      newRows[rowLoop] = []
      for (let colLoop = 0; colLoop < rowItems.length; colLoop++) {
        const curVal = originRows[rowLoop][colLoop]
        if (curVal !== null) {
          newRows[rowLoop][colLoop] = { v: curVal, r: 1, c: 1 }
        } else {
          newRows[rowLoop][colLoop] = null
          continue
        }
        colLogic(originRows, newRows[rowLoop][colLoop], rowLoop, colLoop)
      }
    }

    return { originRows, newRows }

    // 把值相同的列合并
    // 合并规则 => ['1','1'] => [{ v:'1', r:1, c:2 },null]
    function colLogic(originRows, curNewItem, rowLoop, colLoop) {
      for (let remainColStep = colLoop + 1; remainColStep < originRows[rowLoop].length; remainColStep++) {
        if (curNewItem.v === originRows[rowLoop][remainColStep]) {
          // 置空原数组的指定位置
          originRows[rowLoop][remainColStep] = null
          curNewItem.c++
        } else {
          break
        }
      }
    }
  }

  function mergeRow({originRows, newRows}) {
    for (let rowLoop = 0; rowLoop < originRows.length; rowLoop++) {
      const rowItems = originRows[rowLoop]
      for (let colLoop = 0; colLoop < rowItems.length; colLoop++) {
        const curVal = originRows[rowLoop][colLoop]
        if (curVal === null) {
          newRows[rowLoop][colLoop] = null
          continue
        }
        rowLogic(originRows, newRows[rowLoop][colLoop], rowLoop, colLoop)
      }
    }
    
    return { originRows, newRows }

    // 把值相同的行合并
    // 合并规则 => [['1','2'],['1','3']] => [[{ v: '1', r: 2, c: 1 }, {...}], [null, {...}] ]
    function rowLogic(originRows, curNewItem, rowLoop, colLoop) {
      for (let remainRowStep = rowLoop + 1; remainRowStep < originRows.length; remainRowStep++) {
        if (curNewItem.v === originRows[remainRowStep][colLoop]) {
          // 置空原数组的指定位置
          originRows[remainRowStep][colLoop] = null
          curNewItem.r++
        } else {
          break
        }
      }
    }
  }

  function toXlsx(originRows) {
    const res = {}
    const letter = (num) => {
      const suffixLen = Math.floor(num / 26)
      const latestLetter = String.fromCharCode(num % 26 + 64) 
      const suffixLetter = new Array(suffixLen).fill('A').join('')
      return suffixLetter + latestLetter
    }
    originRows.forEach((colItems, rowIndex) => {
      colItems.forEach((colItem, colIndex) => {
        if (colItem !== null) {
          res[letter(colIndex + 1) + (rowIndex + 1)] = { v: colItem }
        }
      })                
    })
    return res
  }

  function countMergeRules(newRows) {
    const res = []
    newRows.forEach((rows/*Array*/, rowIndex/*Number*/) => {
      let prevColSum = 0
      rows.forEach((colItem) => {
        colItem && res.push({ 
          s: { r: rowIndex, c: prevColSum }, 
          e: { r: rowIndex + colItem.r - 1, c: (prevColSum += colItem.c) - 1 }
        })
      })
    })

    const queryRes = []
    res.length && res.forEach((item)=>{
      if (item.s.r === item.e.r && item.s.c === item.e.c) {
      } else {
        queryRes.push(item)
      }
    })
    return queryRes
  }
}

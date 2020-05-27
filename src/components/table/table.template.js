const chrCodes= {
  A: 65,
  Z: 90
}

function toChar(_, index) {
  return String.fromCharCode(chrCodes.A + index)
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `<div class="column">${col}</div>`
}

function createRow(numRow, content) {
  return `
    <div class="row"> 
    <div class="row-info">${numRow ? numRow : ''}</div>
    <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = chrCodes.Z - chrCodes.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')


  rows.push(createRow(null, cols))


  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i+1, cells))
  }

  return rows.join('')
}

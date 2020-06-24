const chrCodes= {
  A: 65,
  Z: 90
}

function toChar(_, index) {
  return String.fromCharCode(chrCodes.A + index)
}

function createCell(row) {
  return function(_, col) {
    return `
    <div class="cell" 
    contenteditable 
    data-col="${toChar(_, col)}"
    data-type="cell" 
    data-id="${row}:${col}"
    ></div>
    `
  }
}

function createColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${toChar(null, index)}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(numRow, content) {
  const resize = numRow ?
          '<div class="row-resize" data-resize="row"> </div>' : ''
  return `
    <div class="row" data-type="resizable"> 
      <div class="row-info">
        ${numRow ? numRow : ''}
        ${resize}
      </div>
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
      .map(createColumn)
      .join('')


  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCell(row))
        .join('')

    rows.push(createRow(row+1, cells))
  }

  return rows.join('')
}

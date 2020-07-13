import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const chrCodes= {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toChar(_, index) {
  return String.fromCharCode(chrCodes.A + index)
}

function createCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id] || ''
    const parseData = parse(data) || ''

    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })

    return `
    <div class="cell" 
      contenteditable 
      data-col="${col}"
      data-type="cell" 
      data-id="${id}"
      data-value="${data || ''}"
      style="${styles}; width: ${width}"
    >${parseData || data}</div>`
  }
}

function createColumn({col, index, width}) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div 
        class="row" 
        data-type="resizable" 
        data-row="${index ? index : ''}"
        style="height: ${height}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = chrCodes.Z - chrCodes.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(state, row))
        .join('')

    rows.push(createRow(row+1, cells, state.rowState))
  }

  return rows.join('')
}

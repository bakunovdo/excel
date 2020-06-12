import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const colCells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  const sideResize = type === 'col' ? 'bottom' : 'right'

  let value = 0

  $resizer.css({
    opacity: 1,
    [sideResize]: '-5000px'
  })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const dX = e.pageX - coords.right
      value = coords.width + dX
      $resizer.css({right: -dX + 'px'})
    } else {
      const dY = e.pageY - coords.bottom
      value = coords.height + dY
      $resizer.css({bottom: -dY + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (value != 0) {
      if (type === 'col') {
        $parent.css({width: value + 'px'})
        colCells.forEach((el) => {
          el.style.width = value + 'px'
        })
      } else {
        $parent.css({height: value + 'px'})
      }
    }

    $resizer.clearCss()
  }
}

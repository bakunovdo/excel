import {ExcelComponent} from '@/core/ExcelComponent'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/activeRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input class="input"  type="text"  value="${title}">

      <div>
          <div class="button" data-button="remove">
              <i class="material-icons" data-button="remove">delete</i>
          </div>

          <div class="button" data-button="exit">
              <i class="material-icons" data-button="exit">exit_to_app</i>
          </div>
      </div>
    `
  }

  updateTitleInStore(value) {
    this.$dispatch(actions.changeTitle(value))
  }

  onInput(event) {
    this.updateTitleInStore($(event.target).text())
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const desicion = confirm('Вы действительно хотите удалить эту таблицу?')
      if (desicion) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    }

    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}

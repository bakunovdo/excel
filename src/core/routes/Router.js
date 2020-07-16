import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/activeRoute'
import {PAGE_EXCEL} from '@/constants'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  getRoute() {
    const path = ActiveRoute.page
    if (path === PAGE_EXCEL) {
      return this.routes.excel
    }
    return this.routes.dashboard
  }

  changePageHandler() {
    this.$placeholder.clear()
    if (this.page) {
      this.page.destroy()
    }

    const Page = this.getRoute()
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}

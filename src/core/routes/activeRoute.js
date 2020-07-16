export class ActiveRoute {
  static get path() {
    return window.location.hash.split('/')
  }

  static get page() {
    return ActiveRoute.path[0]
  }

  static get param() {
    return ActiveRoute.path[1]
  }

  static navigate(path) {
    window.location.hash = path
  }
}

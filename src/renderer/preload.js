const injectCSS = require('./utils/inject-css')

window.addEventListener('DOMContentLoaded', () => {
  injectCSS('src', 'renderer', 'styles', 'style.css')

  /** zen mode */
  require('./modules/zen-mode/index')()
})

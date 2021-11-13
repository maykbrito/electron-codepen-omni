const { ipcRenderer } = require('electron')

console.log('zen-mode Loaded')

const injectCSS = require('../../utils/inject-css')

/* Hide Elements */
ipcRenderer.on('toggleHide', () => toggleHideElements())

let hide = false
function toggleHideElements() {
  hide
    ? document.body.classList.add('zen')
    : document.body.classList.remove('zen')

  hide = !hide
}

toggleHideElements()

module.exports = () => {
  injectCSS('src', 'renderer', 'modules', 'zen-mode', 'style.css')
}

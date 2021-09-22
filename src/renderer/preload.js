const { ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs')
const appPath = ipcRenderer.sendSync('request-app-path')

function injectCSS(cssPath) {
  const cssContent = fs.readFileSync(cssPath)
  const styleEl = document.createElement('style')
  styleEl.innerHTML = cssContent
  document.head.append(styleEl)
}

window.addEventListener('DOMContentLoaded', () => {
  injectCSS(path.resolve(appPath, 'src', 'renderer', 'styles', 'style.css'))

  /* hide elements */
  toggleHideElements()
})

/* Hide Elements */
ipcRenderer.on('toggleHide', () => toggleHideElements())

let hide = false
function toggleHideElements() {
  hide
    ? document.body.classList.add('zen')
    : document.body.classList.remove('zen')

  hide = !hide
}

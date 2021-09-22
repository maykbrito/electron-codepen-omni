const {
  app,
  BrowserWindow,
  globalShortcut,
  shell,
  ipcMain
} = require('electron')
const path = require('path')

let win = null
app.allowRendererProcessReuse = true

function createWindow() {
  win = new BrowserWindow({
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '..', 'renderer', 'preload.js') // use a preload script
    }
  })

  win.loadURL('https://codepen.io/pen/?editors=0012')

  win.webContents.on('new-window', checkerURL) // add event listener for URL check
}

function createShortcuts() {
  const toggleHide = 'Alt+Shift+control+r'
  globalShortcut.register(toggleHide, () => {
    win.webContents.send('toggleHide')
  })
}

/**
 * This function is used electron's new-window event
 * It allows non-electron links to be opened with the computer's default browser
 * Keep opening pop-ups for google login for example
 * @param {NewWindowEvent} e
 * @param {String} url
 */
function checkerURL(e, url) {
  const isNotUrlOfTheNotion = !url.match('/codepen.io')

  if (isNotUrlOfTheNotion) {
    e.preventDefault()
    shell.openExternal(url)
  }
}

app
  .whenReady()
  .then(() => {
    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  .then(() => createShortcuts())

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('request-app-path', (event, arg) => {
  event.returnValue = app.getAppPath()
})

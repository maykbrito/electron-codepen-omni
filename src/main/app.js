import {
  app,
  BrowserWindow,
  screen,
  nativeImage,
  globalShortcut
} from 'electron'
import path from 'path'

import { assetsPath } from './utils/assets-path'
import { checkerURL } from './utils/check-url'

let win = null
app.allowRendererProcessReuse = true

async function createWindow() {
  win = new BrowserWindow({
    icon: nativeImage.createFromPath(
      path.join(assetsPath, 'assets', 'icon.png')
    ),
    frame: false,
    // titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  adjustWindow(win)

  win.loadURL('https://codepen.io/pen/?editors=0012')

  win.webContents.on('new-window', checkerURL) // add event listener for URL check
}

function adjustWindow(win) {
  const { size } = screen.getPrimaryDisplay()
  const { width, height } = size

  win.setPosition(0, 0)
  win.setSize(width, height)
}

function createShortcuts() {
  const toggleHide = 'Alt+Shift+control+r'
  globalShortcut.register(toggleHide, () => {
    win.webContents.send('toggleHide')
  })
}

//Verifica se o app já foi iniciado
const isUnicInstance = app.requestSingleInstanceLock()

if (!isUnicInstance) {
  app.quit()
} else {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app
    .whenReady()
    .then(createWindow)
    .then(() => createShortcuts())
    .catch(e => console.error(e))
}

// Faz com que o programa não inicie várias vezes durante a instalação no windows
if (require('electron-squirrel-startup')) {
  app.quit()
}

app.on('second-instance', () => {
  const win = BrowserWindow.getAllWindows()[0]
  if (win.isMinimized()) {
    win.restore()
  }
  win.focus()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', recreateWindow)

function recreateWindow() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    setTimeout(createWindow, 200)
  }
}

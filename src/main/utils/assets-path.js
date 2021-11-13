import { app, ipcMain } from 'electron'

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

ipcMain.on('request-app-path', (event, arg) => {
  event.returnValue = assetsPath
})

export { assetsPath }

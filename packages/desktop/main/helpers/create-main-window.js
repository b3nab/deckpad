import isDev from 'electron-is-dev'
import createWindow from './create-window'

export default async function createMainWindow({prefs, port}) {
  const win = createWindow(prefs.name, prefs.options)

  if (isDev) {
    await win.loadURL(`http://localhost:${port}/home`)
    win.webContents.openDevTools()
  } else {
    await win.loadURL('app://./home.html')
  }

  // win.webContents.on('did-finish-load', () => {
  //   win.webContents.send('set-socket', { name: socketName })
  // })

  return win
}

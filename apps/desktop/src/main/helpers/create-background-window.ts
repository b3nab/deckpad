import { BrowserWindow } from 'electron'
// import { __dirname } from './cjs-utils'

export default function createBackgroundWindow(socketName: any) {
  const win = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(`file://${__dirname}/server-dev.html`)

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('set-socket', { name: socketName })
  })

  return win
}

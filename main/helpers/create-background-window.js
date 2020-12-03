import { app } from 'electron'
import { fork } from 'child_process'


export default function createBackgroundWindow(socketName) {
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

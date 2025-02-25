import { shell } from 'electron'
import { is } from '@electron-toolkit/utils'
import createWindow from './create-window'
import { fileURLToPath } from 'node:url'

export default async function createMainWindow({ prefs, port }: any) {
  const win = createWindow(prefs.name, prefs.options)

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    win.webContents.openDevTools()
  } else {
    //   await win.loadFile(join(__dirname, '../renderer/index.html'))
    const rendererApp = fileURLToPath(new URL('../renderer/index.html', import.meta.url))
    await win.loadFile(rendererApp.toString())
  }

  // win.webContents.on('did-finish-load', () => {
  //   win.webContents.send('set-socket', { name: socketName })
  // })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  return win
}

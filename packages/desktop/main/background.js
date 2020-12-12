import { app, Tray, Menu } from 'electron'
import path from 'path'
import serve from 'electron-serve'
import Store from 'electron-store'
import { createMainWindow } from './helpers'
// IPC MAIN RESOLVERS
import { loadIPCs, plugins, deckServer, saveAndLoad, image } from './ipc'

let mainWin

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
  await app.whenReady()
  // ---- Start Window ----
  // ----------------------
  mainWin = await createMainWindow({
    prefs: {
      name: 'main',
      options: {
        width: 1000,
        height: 650,
      }
    },
    port: process.argv[2]
  })
  
  
  // ---- Load App Modules ----
  // --------------------------
  const store = new Store()
  const sendMessageToMain = (channel, msg) => mainWin.webContents.send(channel, msg)
  
  loadIPCs({ store, sendMessageToMain }, [
    saveAndLoad,
    deckServer,
    plugins,
    image
  ])
  
  // ---- Tray Icon ----
  // -------------------
  // const iconLogo = app.isPackaged ? `${path.join(app.getPath('appData'),'resources','logo.png')}` : `${path.join(__dirname,'..','resources','logo.png')}`
  // const tray = new Tray(iconLogo)
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ])
  // tray.setToolTip('MyDeck Configurator App')
  // tray.setContextMenu(contextMenu)
  
  // Inform App that all MyDeck modules are ready
  sendMessageToMain('mydeck-ready', true)
})()

app.on('window-all-closed', () => {
  app.quit()
})

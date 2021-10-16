import { app, ipcMain, nativeImage } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import pubsub from 'electron-pubsub'
import { createMainWindow, buildMenu, buildTray } from './helpers'
// IPC MAIN RESOLVERS
import { loadIPCs, plugins, deckServer, saveAndLoad, image } from './ipc'
import { Quantum } from '@deckpad/sdk'
import path from 'path'
const iconPath = path.join(__dirname, '..', 'resources', 'icons/icon-512x512.png')
const iconImage = nativeImage.createFromPath(iconPath)

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
  await app.whenReady()
  console.log('[DeckPad]')
  console.log('platform: ', process.platform)
  console.log('locale: ', app.getLocale())
  // ---- Start Window ----
  // ----------------------
  const mainWin = await createMainWindow({
    prefs: {
      name: 'main',
      options: {
        icon: iconImage,
        width: 1000,
        height: 720,
        minWidth: 665,
        minHeight: 450,
      }
    },
    port: process.argv[2]
  })
  
  const store = new Store()
  const toConfigurator = (channel, msg) => mainWin.webContents.send(channel, msg)
  
  // ---- Init Quantum ----
  // ----------------------
  Quantum.init({
    pubsub,
    ipcMain,
    store,
    toConfigurator,
  })
  
  loadIPCs([
    image,
    saveAndLoad,
    deckServer,
    plugins,
  ])
  
  // ---- Window Decorations ----
  buildMenu()
  buildTray()
  
  // Inform App that all DeckPad modules are ready
  toConfigurator('deckpad-ready', true)
})()

app.on('window-all-closed', () => {
  app.quit()
})

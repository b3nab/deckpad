import path from 'path'
import { app, ipcMain, nativeImage } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import pubsub from 'electron-pubsub'
import { Quantum } from '@deckpad/sdk'
// IPC MAIN RESOLVERS
import { loadIPCs, plugins, deckServer, saveAndLoad, image } from './ipc'
import { createMainWindow, buildMenu, buildTray } from './helpers'
import { startDeckServer } from './server'
import epm from 'electron-plugin-manager'
import { extensionsDir } from './configs'

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
  let mainWin

  const store = new Store()
  const toConfigurator = (channel, msg) => mainWin.webContents.send(channel, msg)

  // Init DeckPad Server
  // NEW refactor for IPC, socket.io, pubsub to websockets
  // startDeckServer()

  // ---- Init Quantum ----
  // ----------------------
  Quantum.init({
    pubsub,
    ipcMain,
    store,
    toConfigurator,
    ext: {
      epm,
      extensionsDir
    },
  })

  loadIPCs([
    image,
    saveAndLoad,
    deckServer,
    plugins,
  ])

  // ---- App Decorations ----
  // buildMenu()
  // buildTray(iconImage)

  // ---- Start Window ----
  // ----------------------
  mainWin = await createMainWindow({
    prefs: {
      name: 'main',
      options: {
        backgroundColor: '#030303',
        icon: iconImage,
        width: 1000,
        height: 720,
        minWidth: 665,
        minHeight: 450,
      }
    },
    port: process.argv[2]
  })

  // Inform App that all DeckPad modules are ready
  toConfigurator('deckpad-ready', true)
})()

app.on('window-all-closed', () => {
  app.quit()
})

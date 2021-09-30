import { app } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import pubsub from 'electron-pubsub'
import { createMainWindow, buildMenu, buildTray } from './helpers'
// IPC MAIN RESOLVERS
import { loadIPCs, plugins, deckServer, saveAndLoad, image } from './ipc'

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
        width: 1000,
        height: 720,
        minWidth: 665,
        minHeight: 450,
      }
    },
    port: process.argv[2]
  })
  
  
  // ---- Load App Modules ----
  // --------------------------
  const store = new Store()
  const sendMessageToRenderer = (channel, msg) => mainWin.webContents.send(channel, msg)
  const toIO = (...params) => pubsub.publish('io', ...params)
  
  loadIPCs({ store, toIO, sendMessageToRenderer }, [
    saveAndLoad,
    deckServer,
    plugins,
    image
  ])
  
  // ---- Window Decorations ----
  buildMenu()
  buildTray()
  
  // Inform App that all DeckPad modules are ready
  sendMessageToRenderer('deckpad-ready', true)
})()

app.on('window-all-closed', () => {
  app.quit()
})

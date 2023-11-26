import { app, ipcMain, BrowserWindow, nativeImage } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import serve from 'electron-serve'
import Store from 'electron-store'
import pubsub from 'electron-pubsub'
import { Quantum } from '@deckpad/sdk'
// IPC MAIN RESOLVERS
import { loadIPCs, plugins, deckServer, saveAndLoad, image } from './ipc'
import { createMainWindow, buildMenu, buildTray } from './helpers'
import { startDeckServer } from './server'
import epm from 'electron-plugin-manager'
import { extensionsDir } from './configs'
import { fileURLToPath } from 'url'

const icon = new URL('./../../resources/icons/icon-512x512.png?asset', import.meta.url)
// const iconPath = new URL('../resources/icons/icon-512x512.png', import.meta.url)
// const iconImage = nativeImage.createEmpty()
const iconImage = nativeImage.createFromPath(icon.toString())

if (is.dev) {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}
// else {
//   serve({ directory: 'app' })
// }

async function appReady(): Promise<void> {
  console.log('[DeckPad]')
  console.log('platform: ', process.platform)
  console.log('locale: ', app.getLocale())
  let mainWin

  const store = new Store()
  const toConfigurator = (channel, msg) => mainWin.webContents.send(channel, msg)

  // Init DeckPad Server
  // NEW refactor for IPC, socket.io, pubsub to websockets
  startDeckServer()

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
    }
  })

  loadIPCs([image, saveAndLoad, deckServer, plugins])

  // ---- App Decorations ----
  buildMenu()
  buildTray(iconImage)

  // ---- Start Window ----
  // ----------------------
  const preloadScript = fileURLToPath(new URL('../preload/index.cjs', import.meta.url))
  console.log('PRELOAD SCRIPT PATH => ', preloadScript)
  mainWin = await createMainWindow({
    prefs: {
      name: 'main',
      options: {
        // backgroundColor: '#030303',
        //   show: false,
        //   autoHideMenuBar: true,
        //   ...(process.platform === 'linux' ? { icon } : {}),
        // icon: iconImage,
        width: 1200,
        height: 800,
        // minWidth: 920,
        // minHeight: 780,
        webPreferences: {
          preload: preloadScript,
          nodeIntegration: true,
          sandbox: false,
          contextIsolation: false
        }
      }
    },
    port: process.argv[2]
  })

  // Inform App that all DeckPad modules are ready
  toConfigurator('deckpad-ready', true)

  mainWin.on('ready-to-show', () => {
    mainWin.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  appReady()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) appReady()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

import { app } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import { createMainWindow } from './helpers'

// IPC MAIN RESOLVERS
import { loadIPCs, deckServer, saveAndLoad, image } from './ipc'
// import './ipc/save&load'
// import './ipc/image'
// import './ipc/deckServer'

let mainWin
// , serverWin, serverProc

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
  await app.whenReady()

  const store = new Store({
    defaults: {
      server: null,
      currentBoard: null,

    }
  })
  loadIPCs({ store }, [
    deckServer,
    saveAndLoad,
    image
  ])

  mainWin = await createMainWindow({
    prefs: {
      name: 'main',
      options: {
        width: 850,
        height: 530,
      }
    },
    port: process.argv[2]
  })
})()

app.on('window-all-closed', () => {
  app.quit()
})

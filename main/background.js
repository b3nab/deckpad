import { app } from 'electron'
import serve from 'electron-serve'
import { createMainWindow } from './helpers'
import '../server'

// IPC MAIN RESOLVERS
import './ipc/save&load'
import './ipc/image'

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

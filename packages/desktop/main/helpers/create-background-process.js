import { app } from 'electron'
import { fork } from 'child_process'
import isDev from 'electron-is-dev'

export default function createBackgroundProcess() {
    serverProcess = fork(__dirname + '/server/index.js', [
        isDev,
    //   '--subprocess',
    //   app.getVersion(),
    //   socketName
    ])
  
    serverProcess.on('message', msg => {
      console.log(msg)
    })

    return serverProcess
  }
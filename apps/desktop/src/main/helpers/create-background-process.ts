import { app, utilityProcess } from 'electron'
import { fork } from 'child_process'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'
// import { __dirname } from './cjs-utils'

export default function createBackgroundProcess() {
  // const serverProcess = utilityProcess.fork(__dirname + '/server/index.js', [
  //   is.dev
  //   //   '--subprocess',
  //   //   app.getVersion(),
  //   //   socketName
  // ])
  const serverProcess = utilityProcess.fork(join(__dirname, '/server/index.js'))
  serverProcess.on('message', (msg) => {
    console.log(msg)
  })

  return serverProcess
}

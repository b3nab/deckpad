import { ipcMain } from 'electron'
import { createServer } from 'http'
import express from 'express'
import iIP from 'internal-ip'
import pubsub from 'electron-pubsub'
import detect from 'detect-port'
import { configureServerIO } from './server-io'

const startDeckServer = async (ipcProps) => {
  const { store, sendMessageToRenderer } = ipcProps
  const app = express()
  const deckServer = createServer(app)
  const io = await configureServerIO({deckServer, ipcProps})
  console.log(`io dict keys: ${Object.keys(io.httpServer)}`)
  const port = await detect(8332)
  const localIP = await iIP.v4()
  const address = `http://${localIP}:${port}`
  const server = deckServer.listen(port, '0.0.0.0', () => console.log(`
  deckServer listening on port ${port}
  It's accessible on LAN at address ${address}`))
  
  return {
    server: server,
    io, io,
    address: address,
  }
}

export {
  startDeckServer
}

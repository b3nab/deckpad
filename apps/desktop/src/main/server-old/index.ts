import { createServer } from 'http'
import express from 'express'
import { internalIpV4 } from 'internal-ip'
import detect from 'detect-port'
import { configureServerIO } from './server-io'

const startDeckServer = async () => {
  const app = express()
  const deckServer = createServer(app)
  const io = await configureServerIO(deckServer)
  console.log(`io dict keys: ${Object.keys(io)}`)
  const port = await detect(8332)
  const localIP = await internalIpV4()
  const address = `http://${localIP}:${port}`
  const server = deckServer.listen(port, '0.0.0.0', () =>
    console.log(`
  deckServer listening on port ${port}
  It's accessible on LAN at address ${address}`)
  )

  return {
    server: server,
    io,
    address: address
  }
}

export { startDeckServer }

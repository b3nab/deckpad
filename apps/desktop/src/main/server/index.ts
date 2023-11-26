import { createServer } from 'http'
import { internalIpV4 } from 'internal-ip'
import detect from 'detect-port'
import { configureWSS } from './wss'

const startDeckServer = async () => {
  const port = await detect(8332)
  const localIP = await internalIpV4()
  const address = `http://${localIP}:${port}`

  const wss = await configureWSS(port)

  // console.log(`io dict keys: ${Object.keys(io.httpServer)}`)
  // const server = deckServer.listen(port, '0.0.0.0', () => console.log(`
  // deckServer listening on port ${port}
  // It's accessible on LAN at address ${address}`))

  // return {
  //   server: server,
  //   io, io,
  //   address: address,
  // }
}

export { startDeckServer }

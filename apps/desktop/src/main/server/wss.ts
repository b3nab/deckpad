import { Quantum } from '@deckpad/sdk'
import { Server as WebSocketServer } from 'ws'
import { loadBoard, saveBoard } from '../helpers'

const parseEvent = (e) => {
  console.log('WS event => ', e)
  return {
    channel: e.data ? Object.keys(e.data)[0] : '',
    data: e.data ? Object.values(e.data)[0] : null,
    whois: 'CLIENT'
  }
}

const actFast = async (ws, channel, data) => {
  switch (channel) {
    case 'companion':
      console.log('[WSS] new companion =>', data.companionName)
      Quantum.toConfigurator('companion', data.companionName)
      let currentBoard = Quantum.store.get('currentBoard')
      const board = loadBoard(currentBoard)
      ws.emit('board', board)
      break
    case 'action':
      // const { position, action } = data
      // console.log(`fire action from button @position ${position}\nwith action: ${JSON.stringify(action, null, 2)}`)
      // const fireStatus = await firePlugin(data)
      // !fireStatus && console.log('fireStatus error, not completed')
      // ws.send(fireStatus)
      break
    default:
      console.log('cannot detect message channel')
      break
  }
  return

  // pubsub.subscribe('io', async (event, ...data) => {
  //   // console.log('[PUBSUB] WSS with data =>',data)
  //   ws.emit(...data)
  // })
}

const configureWSS = async (port) => {
  const wss = new WebSocketServer({
    path: '/deckpad',
    port: port
    // server: deckServer,
  })

  //Whenever someone connects this gets executed
  wss.on('connection', function (ws) {
    console.log('A user connected')

    //Whenever someone disconnects this piece of code executed
    ws.on('close', () => {
      console.log('A user disconnected')
      Quantum.toConfigurator('companion', null)
    })

    // Message from Configurator/Companion
    ws.on('message', async (e) => {
      const { channel, data, whois } = parseEvent(e)
      await actFast(ws, channel, data)
    })
  })

  // ipcMain.on('update-board', (event, board) => {
  //   console.log(`fire "Quantum.toCompanion" - send board`)
  //   Quantum.toCompanion('board', board)
  // })

  console.log(`end configuring WSS!`)

  return wss
}

// const firePlugin = async ({action, origin}) => {
//   if(!action.plugin || !action.options) return false
//   pubsub.publish('fire-plugin', {action, origin})
//   return true
// }

export { configureWSS }

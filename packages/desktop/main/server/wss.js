import { Quantum } from '@deckpad/sdk'
import { WebSocketServer } from 'ws'
import { loadBoard, saveBoard } from '../helpers'

const configureWSS = async (deckServer) => {
  const options = {
    path: '/deckpad',
    server: deckServer,
  }
  const wss = new WebSocketServer(options)
  //Whenever someone connects this gets executed
  wss.on('connection', function(ws) {
    console.log('A user connected')

    ws.

    //Whenever someone disconnects this piece of code executed
    ws.on('disconnect', function () {
      console.log('A user disconnected')
      Quantum.toConfigurator('companion', null)
    })

    ws.on('companion', (companionName) => {
      console.log('[WSS] new companion =>', companionName)
      Quantum.toConfigurator('companion', companionName)
      let currentBoard = Quantum.store.get('currentBoard')
      const board = loadBoard(currentBoard)
      ws.emit('board', board)
    })
    
    ws.on('action', async (data) => {
      const { position, action } = data
      // console.log(`fire action from button @position ${position}\nwith action: ${JSON.stringify(action, null, 2)}`)
      const fireStatus = await firePlugin(data)

      // !fireStatus && console.log('fireStatus error, not completed')
      
      // ws.send(fireStatus)
    })

    pubsub.subscribe('io', async (event, ...data) => {
      // console.log('[PUBSUB] WSS with data =>',data)
      ws.emit(...data)
    })
  })
    
  ipcMain.on('update-board', (event, board) => {
    console.log(`fire "Quantum.toCompanion" - send board`)
    Quantum.toCompanion('board', board)
  })
  
  console.log(`end configuring WSS!`)

  return wss
}

const firePlugin = async ({action, origin}) => {
  if(!action.plugin || !action.options) return false
  pubsub.publish('fire-plugin', {action, origin})
  return true
}

export {
  configureWSS
}

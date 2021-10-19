import { ipcMain } from 'electron'
import socketIO from 'socket.io'
import pubsub from 'electron-pubsub'
import { Quantum } from '@deckpad/sdk'
import { loadBoard, saveBoard } from '../helpers'

const configureServerIO = async (deckServer) => {
  const options = {
    // path: '/deckpad'
  }
  const io = socketIO(deckServer, options)
  //Whenever someone connects this gets executed
  io.on('connection', function(socket) {
    console.log('A user connected')

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected')
      Quantum.toConfigurator('companion', null)
    })

    socket.on('companion', (companionName) => {
      console.log('[IO] new companion =>', companionName)
      Quantum.toConfigurator('companion', companionName)
      let currentBoard = Quantum.store.get('currentBoard')
      const board = loadBoard(currentBoard)
      socket.emit('board', board)
    })
    
    socket.on('action', async (data) => {
      const { position, action } = data
      // console.log(`fire action from button @position ${position}\nwith action: ${JSON.stringify(action, null, 2)}`)
      const fireStatus = await firePlugin(data)

      // !fireStatus && console.log('fireStatus error, not completed')
      
      // socket.send(fireStatus)
    })

    pubsub.subscribe('io', async (event, ...data) => {
      // console.log('[PUBSUB] IO with data =>',data)
      socket.emit(...data)
    })
  })
    
  ipcMain.on('update-board', (event, board) => {
    console.log(`fire "Quantum.toCompanion" - send board`)
    Quantum.toCompanion('board', board)
  })
  
  console.log(`end configuring IO socket server!`)

  return io
}

const firePlugin = async ({action, origin}) => {
  if(!action.plugin || !action.options) return false
  pubsub.publish('fire-plugin', {action, origin})
  return true
}

export {
  configureServerIO
}

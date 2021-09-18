import { ipcMain } from 'electron'
import socketIO from 'socket.io'
import pubsub from 'electron-pubsub'
import { loadBoard, saveBoard } from '../helpers'

const configureServerIO = async ({deckServer, ipcProps}) => {
  const { store, sendMessageToRenderer } = ipcProps
  const options = {
    // path: '/mydeck'
  }
  const io = socketIO(deckServer, options)
  //Whenever someone connects this gets executed
  io.on('connection', function(socket) {
    console.log('A user connected')

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected')
      sendMessageToRenderer('companion', null)
    })

    socket.on('companion', (companionName) => {
      console.log('[IO] new companion =>', companionName)
      sendMessageToRenderer('companion', companionName)
      let currentBoard = store.get('currentBoard')
      const board = loadBoard(currentBoard)
      socket.emit('board', board)
    })
    
    socket.on('action', async (data) => {
      const { position, action } = data
      console.log(`fire action from button @position ${position}\nwith action: ${JSON.stringify(action, null, 2)}`)
      const fireStatus = await firePlugin({action, position})
      
      socket.send(fireStatus)
    })

    pubsub.subscribe('io', async (event, ...data) => {
      console.log(`[PUBSUB] IO with data => ${data}`)
      socket.emit(...data)
    })
  })
  
  console.log(`end configuring IO socket server!`)

  return io
}

const firePlugin = async ({action, position}) => {
  if(!action.plugin || !action.type || !action.options) return false
  pubsub.publish('fire-plugin', action)
  return true
}

export {
  configureServerIO
}

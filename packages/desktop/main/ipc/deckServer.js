import { ipcMain } from 'electron'
import { startDeckServer } from '../server-old'

// ---------------------------------
//    DeckPad Server in Background
// ---------------------------------
export const deckServer = () => {
  let deckServerOBJ = {}

  ipcMain.on('start-server', async (event, arg) => {
    console.log(`fire "start-server"`)
    deckServerOBJ = await startDeckServer()
    if(deckServerOBJ) {
      event.sender.send('started-server', deckServerOBJ.address)
    }
  })

  ipcMain.on('stop-server', (event, arg) => {
    console.log(`fire "stop-server"`)
    if(deckServerOBJ) {
      deckServerOBJ.io.emit('off')
      deckServerOBJ.io.disconnectSockets()
      deckServerOBJ.server.close(() => {
        event.sender.send('stopped-server', true)
      })
    }
  })
}

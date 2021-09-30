import { ipcMain } from 'electron'
import { startDeckServer } from '../server'

// ---------------------------------
//    DeckPad Server in Background
// ---------------------------------
export const deckServer = (ipcProps) => {
  const { store } = ipcProps
  let deckServerOBJ = {}
  
  ipcMain.on('start-server', async (event, arg) => {
    console.log(`fire "start-server"`)
    deckServerOBJ = await startDeckServer(ipcProps)
    if(deckServerOBJ) {
      event.sender.send('started-server', deckServerOBJ.address)
    }
  })
  
  ipcMain.on('stop-server', (event, arg) => {
    console.log(`fire "stop-server"`)
    if(deckServerOBJ) {
      deckServerOBJ.io.disconnectSockets()
      deckServerOBJ.server.close(() => {
        event.sender.send('stopped-server', true)
      })
      store.set('server', null)
    }
  })
}

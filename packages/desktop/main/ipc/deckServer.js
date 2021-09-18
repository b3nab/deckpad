import { BrowserWindow, dialog, ipcMain } from 'electron'
import { startDeckServer } from '../server'

// ---------------------------------
//    MyDeck Server in Background
// ---------------------------------
export const deckServer = (ipcProps) => {
  const { store, sendMessageToRenderer } = ipcProps
  let deckServerOBJ = {}
  
  ipcMain.on('start-server', async (event, arg) => {
    console.log(`fire "start-server"`)
    deckServerOBJ = await startDeckServer(ipcProps)
    // store.set('server', deckServerOBJ)
    // console.log(`result from "start-server" ==>\n ${JSON.stringify(deckServerOBJ, null, 2)}`)
    if(deckServerOBJ) {
      event.sender.send('started-server', deckServerOBJ.address)
    }
  })
  
  ipcMain.on('stop-server', (event, arg) => {
    console.log(`fire "stop-server"`)
    // deckServerOBJ = store.get('server')
    if(deckServerOBJ) {
      deckServerOBJ.io.disconnectSockets()
      deckServerOBJ.server.close(() => {
        event.sender.send('stopped-server', true)
      })
      store.set('server', null)
    }
  })
}

import { BrowserWindow, dialog, ipcMain } from 'electron'
import { startDeckServer } from '../server'

// ---------------------------------
//    MyDeck Server in Background
// ---------------------------------
export const deckServer = ({ store }) => {
  
  ipcMain.on('start-server', async (event, arg) => {
    console.log(`fire "start-server"`)
    const deckServerOBJ = await startDeckServer({store})
    store.set('server', deckServerOBJ)
    console.log(`result from "start-server" ==>\n ${deckServerOBJ}`)
    if(deckServerOBJ) {
      event.sender.send('started-server', true)
    }
  })
  
  ipcMain.on('stop-server', (event, arg) => {
    console.log(`fire "stop-server"`)
    let deckServer = store.get('server')
    if(deckServer) {
      deckServer.server.close(() => {
        event.sender.send('stopped-server', true)
      })
      store.set('server', null)
    }
  })
}

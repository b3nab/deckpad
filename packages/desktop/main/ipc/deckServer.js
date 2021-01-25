import { BrowserWindow, dialog, ipcMain } from 'electron'
import { startDeckServer } from '../server'

// ---------------------------------
//    MyDeck Server in Background
// ---------------------------------
export const deckServer = ({ store }) => {
  let deckServerOBJ = {}
  
  ipcMain.on('start-server', async (event, arg) => {
    console.log(`fire "start-server"`)
    deckServerOBJ = await startDeckServer({store})
    // store.set('server', deckServerOBJ)
    console.log(`result from "start-server" ==>\n ${deckServerOBJ}`)
    if(deckServerOBJ) {
      event.sender.send('started-server', deckServerOBJ.address)
    }
  })
  
  ipcMain.on('stop-server', (event, arg) => {
    console.log(`fire "stop-server"`)
    // deckServerOBJ = store.get('server')
    if(deckServerOBJ) {
      deckServerOBJ.server.close(() => {
        event.sender.send('stopped-server', true)
      })
      store.set('server', null)
    }
  })
}

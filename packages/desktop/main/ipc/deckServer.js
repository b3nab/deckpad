import { BrowserWindow, dialog, ipcMain } from 'electron'
import { startDeckServer } from '../../server'

// ---------------------------------
//    MyDeck Server in Background
// ---------------------------------

let deckServer

ipcMain.on('start-server', async (event, arg) => {
  const deckServerOBJ = await startDeckServer()
  deckServer = deckServerOBJ
  console.log(`result from "start-server" ==>\n ${deckServerOBJ}`)
  if(deckServerOBJ) {
    event.sender.send('started-server', true)
  }
})

ipcMain.on('stop-server', (event, arg) => {
    if(deckServer) {
      deckServer.server.close(() => {
          event.sender.send('stopped-server', true)
      })
      deckServer = null
      console.log(`result from "stop-server" ==>\n ${!deckServer}`)
  }
})

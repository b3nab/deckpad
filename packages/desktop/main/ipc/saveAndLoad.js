import { BrowserWindow, dialog, ipcMain } from 'electron'
import { loadBoard, saveBoard } from '../helpers'
// -------------------
//      SAVE and
//        LOAD
// -------------------
export const saveAndLoad = ({store, sendMessageToRenderer}) => {
  
  ipcMain.on('load-board', (event, useLastBoard) => {
    let myBoard
    if(useLastBoard) {
      myBoard = store.get('currentBoard')
    } else {
      myBoard = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
        properties: ['openFile'],
        filters: [
          {name: 'MyDeck Board Configuration', extensions: ['board']}
        ]
      })
      myBoard = myBoard ? myBoard[0] : null
    }
    console.log(`result from "load-board" ==>\n ${myBoard}`)
    if(myBoard) {
      store.set('currentBoard', myBoard)
      const board = loadBoard(myBoard)
      event.sender.send('loaded-board', board)
    }
  })
  
  ipcMain.on('save-board', (event, data) => {
    let currentBoard = store.get('currentBoard')
    if(currentBoard) {
      const saved = saveBoard(currentBoard, data)
      event.sender.send('saved-board', saved)
    } else {
      saveAsFunction(event, data)
    }
  })
  ipcMain.on('save-board-as', (event, data) => {
    saveAsFunction(event, data)
  })

  const saveAsFunction = (event, data) => {
    let myBoard = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      properties: ['openFile'],
      filters: [
        {name: 'MyDeck Board Configuration', extensions: ['board']}
      ]
    })
    myBoard += !myBoard.endsWith('.board') ? '.board' : ''
    console.log(`result from "save-board-as" ==>\n ${myBoard}`)
    if(myBoard) {
      store.set('currentBoard', myBoard)
      const saved = saveBoard(myBoard, data)
      event.sender.send('saved-board-as', saved)
    }
  }
}

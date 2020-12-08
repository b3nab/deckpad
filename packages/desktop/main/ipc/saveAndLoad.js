import { BrowserWindow, dialog, ipcMain } from 'electron'
import { loadBoard, saveBoard } from '../helpers'
// -------------------
//      SAVE and
//        LOAD
// -------------------
export const saveAndLoad = ({store}) => {
  
  ipcMain.on('load-board', (event, arg) => {
    const myBoard = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
      properties: ['openFile'],
      filters: [
        {name: 'MyDeck Board Configuration', extensions: ['board']}
      ]
    })
    console.log(`result from "load-board" ==>\n ${myBoard}`)
    if(myBoard) {
      store.set('currentBoard', myBoard[0])
      const board = loadBoard(myBoard[0])
      event.sender.send('loaded-board', board)
    }
  })
  
  const saveAsFunction = (event, data) => {
    const myBoard = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      properties: ['openFile'],
      filters: [
        {name: 'MyDeck Board Configuration', extensions: ['board']}
      ]
    })
    console.log(`result from "save-board-as" ==>\n ${myBoard}`)
    if(myBoard) {
      store.set('currentBoard', myBoard)
      const saved = saveBoard(myBoard, data)
      event.sender.send('saved-board-as', saved)
    }
  }
  
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
}

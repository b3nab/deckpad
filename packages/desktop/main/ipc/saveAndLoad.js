import { BrowserWindow, dialog, ipcMain } from 'electron'
import { Quantum } from '@deckpad/sdk'
import { loadBoard, saveBoard } from '../helpers'
// -------------------
//      SAVE and
//        LOAD
// -------------------
export const saveAndLoad = () => {
  
  ipcMain.on('load-board', (event, useLastBoard) => {
    let myBoard
    if(useLastBoard) {
      console.log('load-board...')
      console.log('Quantum is ', Quantum)
      myBoard = Quantum.store.get('currentBoard')
    } else {
      myBoard = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
        properties: ['openFile'],
        filters: [
          {name: 'DeckPad Board Configuration', extensions: ['board']}
        ]
      })
      myBoard = myBoard ? myBoard[0] : null
    }
    console.log(`result from "load-board" ==>\n ${myBoard}`)
    if(myBoard) {
      Quantum.store.set('currentBoard', myBoard)
      const board = loadBoard(myBoard)
      Quantum.toConfigurator('loaded-board', board)
    }
  })
  
  ipcMain.on('save-board', (event, data) => {
    let currentBoard = Quantum.store.get('currentBoard')
    if(currentBoard) {
      const saved = saveBoard(currentBoard, data)
      Quantum.toConfigurator('saved-board', saved)
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
        {name: 'DeckPad Board Configuration', extensions: ['board']}
      ]
    })
    myBoard += !myBoard.endsWith('.board') ? '.board' : ''
    console.log(`result from "save-board-as" ==>\n ${myBoard}`)
    if(myBoard) {
      Quantum.store.set('currentBoard', myBoard)
      const saved = saveBoard(myBoard, data)
      Quantum.toConfigurator('saved-board-as', saved)
    }
  }
}

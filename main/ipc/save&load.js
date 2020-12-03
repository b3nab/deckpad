import { BrowserWindow, dialog, ipcMain } from 'electron'
import { readFileSync, writeFileSync } from 'fs'

// -------------------
//      SAVE and
//        LOAD
// -------------------
let currentBoardPath

const loadBoard = (path) => {
  const boardFile = readFileSync(path)
  let boardJson = JSON.parse(boardFile)
  return boardJson
}
const saveBoard = (path, board) => {
  const boardJson = JSON.stringify(board, null, 2)
  try {
    writeFileSync(path, boardJson)
  } catch (error) {
    return false
  }
  return true
}

ipcMain.on('load-board', (event, arg) => {
  const myBoard = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
    properties: ['openFile'],
    filters: [
      {name: 'MyDeck Board Configuration', extensions: ['board']}
    ]
  })
  console.log(`result from "load-board" ==>\n ${myBoard}`)
  if(myBoard) {
    currentBoardPath = myBoard[0]
    const board = loadBoard(currentBoardPath)
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
    currentBoardPath = myBoard
    const saved = saveBoard(currentBoardPath, data)
    event.sender.send('saved-board-as', saved)
  }
}

ipcMain.on('save-board', (event, data) => {
  if(currentBoardPath) {
    const saved = saveBoard(currentBoardPath, data)
    event.sender.send('saved-board', saved)
  } else {
    saveAsFunction(event, data)
  }
})
ipcMain.on('save-board-as', (event, data) => {
  saveAsFunction(event, data)
})

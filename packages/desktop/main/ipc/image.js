import { BrowserWindow, dialog, ipcMain } from 'electron'
import { readFileSync } from 'fs'
import { extname } from 'path'
import { Quantum } from '@deckpad/sdk'

// ---------------------------
//      Open Image
// ---------------------------
export const image = () => {
  ipcMain.on('open-image', (event, arg) => {
    const image = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
      properties: ['openFile'],
      filters: [
        {name: 'Image', extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif']}
      ]
    })
    console.log(`result from "open-image" ==>\n ${image}`)
    if(image) {
      const extension = extname(image[0])
      const base64 = readFileSync(image[0]).toString('base64')
      const out = `data:image/${extension};base64,${base64}`
      // console.log('[IPC] image out => ', out)
      Quantum.toConfigurator('selected-btn-image', out)
    }
  })
  ipcMain.on('get-path', (event, arg) => {
    const folderPath = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
      properties: ['openFile'],
      filters: [
        { name: 'All Files', extensions: ['*'] }
      ]
    })
    console.log(`result from "get-path" ==>\n ${folderPath}`)
    if(folderPath) {
      // const extension = extname(folderPath[0])
      // const base64 = readFileSync(folderPath[0]).toString('base64')
      // const out = `data:folderPath/${extension};base64,${base64}`
      // console.log('[IPC] folderPath out => ', out)
      Quantum.toConfigurator('selected-path', folderPath)
    }
  })
}

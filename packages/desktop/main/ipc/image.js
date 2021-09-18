import { BrowserWindow, dialog, ipcMain } from 'electron'
import { readFileSync } from 'fs'
import { extname } from 'path'

// ---------------------------
//      Open Image
// ---------------------------
export const image = (props) => {
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
      event.sender.send('selected-btn-image', out)
    }
  })
}

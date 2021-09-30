import { app, Menu, Tray } from 'electron'
import path from 'path'

// ---- Tray Icon ----
// -------------------
export default function buildTray() {
  console.log('[buildTray] fn')
  const iconLogo = app.isPackaged ? `${path.join(app.getPath('appData'),'resources','logo.png')}` : `${path.join(__dirname,'..','resources','logo.png')}`
  console.log('[ICON] path => ', iconLogo)
  const tray = new Tray(iconLogo)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('DeckPad App')
  tray.setContextMenu(contextMenu)
  return true
}

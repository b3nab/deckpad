import { Menu, Tray } from 'electron'

// ---- Tray Icon ----
// -------------------
export default function buildTray(iconImage) {
  console.log('[buildTray] fn')
  const tray = new Tray(iconImage)
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

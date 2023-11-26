import { app, Tray, Menu } from 'electron'

export default function buildMenu() {
  console.log('[buildMenu] fn')
  const template = [
    // {
    //   label: 'File',
    //   role: 'fileMenu',
    //   submenu: [
    //     { label: 'Open..', click: () => {}}
    //   ]
    // },
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  return true
}

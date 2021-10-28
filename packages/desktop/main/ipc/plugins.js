import { app, dialog, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import { PluginManager } from 'live-plugin-manager'
import epm from 'electron-plugin-manager'
import PluginClerk from 'pluginclerk'
import pubsub from 'electron-pubsub'
import { Quantum, Hyper } from '@deckpad/sdk'
import {
  example,
  audio,
  system,
  commands,
  companion,
} from '../plugins'
import { extensionsDir } from '../configs'

// const manager = new PluginManager()

const clerk = new PluginClerk({
  // keyword specified inside package.json:keywords property
  keyword: 'deckpad-extension',
  // prefix of the plugin to be valid
  // prefix: 'deckpad-',
  // function used for logging receives (logLevel, ...message)
  log: isDev ? console.log : null,
  cacheDuration: null,
})

// ---------------------------------
//          Plugins System
// ---------------------------------
export const plugins = () => {

  // Start Electron-Plugin-Manager
  epm.manager(ipcMain)

  // ---- INIT -----
  const initPlugin = (pluginName, plugin) => {
    console.log(`init plugin: ${pluginName}`)
    Hyper.register(pluginName, plugin)
  }

  // Installed plugins
  const installed = epm.list(extensionsDir)
  console.log('extensionsDir ', extensionsDir)
  console.log('installed ', installed)
  // ------------------------------
  // ---- Load Default Plugins ----
  // ------------------------------
  // isDev && initPlugin("example", example)
  initPlugin("audio", audio)
  initPlugin("system", system)
  initPlugin("commands", commands)
  initPlugin("companion", companion)
  // initPlugin("deckpadBase", deckpadBase)

  // ---- IPC Listeners ----
  // -----------------------
  // ipcMain.on('plugins-installed', async (event, arg) => {
  //   Hyper.work()
  // })
  // ipcMain.on('plugins-available', async (event, arg) => {
  //   const res = await clerk.fetchPlugins({})
  //   Quantum.toConfigurator('plugins-available', res)
  // })
  // ipcMain.on('install-plugin', async (event, {name: pluginName, options}) => {
  //   await manager.install(pluginName)
  //   const plugin = manager.require(pluginName)
  //   initPlugin(pluginName, plugin)
  //   Quantum.toConfigurator('plugins-list-update', serializePlugins())
  // })
  // ipcMain.on('remove-plugin', async (event, pluginName) => {
  //   if(engine[pluginName].fn.stop) {
  //     engine[pluginName].fn.stop()
  //   }
  //   await manager.uninstall(pluginName)
  //   delete engine[PluginName]
  //   Quantum.toConfigurator('plugins-list-update', serializePlugins())
  // })
}

import { dialog, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import { PluginManager } from 'live-plugin-manager'
import PluginClerk from 'pluginclerk'
import pubsub from 'electron-pubsub'
import equal from 'fast-deep-equal'
import { Quantum, Hyper } from '@deckpad/sdk'
import {
  example,
  companion,
  audio,
  commands,
} from '../plugins'

const manager = new PluginManager()
const clerk = new PluginClerk({
  // keyword specified inside package.json:keywords property
  keyword: 'deckpad-plugin',
  // prefix of the plugin to be valid
  prefix: 'deckpad-',
  // function used for logging receives (logLevel, ...message)
  log: isDev ? console.log : null,
  cacheDuration: null,
})

// ---------------------------------
//          Plugins System
// ---------------------------------
export const plugins = () => {
  // ---- INIT -----
  const initPlugin = (pluginName, plugin) => {
    console.log(`init plugin: ${pluginName}`)
    Hyper.register(pluginName, plugin)
  }
  // ------------------------------
  // ---- Load Default Plugins ----
  // ------------------------------
  // isDev && initPlugin("example", example)
  initPlugin("companion", companion)
  initPlugin("audio", audio)
  initPlugin("commands", commands)
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

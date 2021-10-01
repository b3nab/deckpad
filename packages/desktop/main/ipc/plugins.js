import { dialog, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import { PluginManager } from 'live-plugin-manager'
import PluginClerk from 'pluginclerk'
import pubsub from 'electron-pubsub'
import equal from 'fast-deep-equal'
import {
  example,
  companion,
  multimedia,
} from '../plugins'
import Hyper, { isHyperized } from './hyper'

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
export const plugins = ({ store, toIO, sendMessageToRenderer }) => {
  // Hyper Engine configure and load ipc listeners from Configurator (renderer)
  Hyper.configure({ store, toIO, sendMessageToRenderer })
  // ---- INIT -----
  const initPlugin = (pluginName, plugin) => {
    console.log(`init plugin: ${pluginName}`)
    Hyper.register(pluginName, plugin)
  }

  // ---- PubSub Listeners -----
  // ---------------------------
  // with deckServer to call fire() on plugin
  pubsub.subscribe('fire-plugin', async (event, action) => {
    console.log(`fire with action => ${action}`)
    const { plugin, type, options } = action
    try {
      isHyperized(plugin, type)
      const fire = Hyper.engine[plugin].actions[type].fire
      await fire(action)
    } catch (error) {
      error.hyper && toIO('toast', error.msg)
      console.log(`firing action ${plugin} - ${type} : ${error}`)
      return false
    }
  })
  // ---- IPC Listeners ----
  // -----------------------
  // ipcMain.on('plugins-installed', async (event, arg) => {
  //   Hyper.work()
  // })
  // ipcMain.on('plugins-available', async (event, arg) => {
  //   const res = await clerk.fetchPlugins({})
  //   sendMessageToRenderer('plugins-available', res)
  // })
  // ipcMain.on('install-plugin', async (event, {name: pluginName, options}) => {
  //   await manager.install(pluginName)
  //   const plugin = manager.require(pluginName)
  //   initPlugin(pluginName, plugin)
  //   sendMessageToRenderer('plugins-list-update', serializePlugins())
  // })
  // ipcMain.on('remove-plugin', async (event, pluginName) => {
  //   if(engine[pluginName].fn.stop) {
  //     engine[pluginName].fn.stop()
  //   }
  //   await manager.uninstall(pluginName)
  //   delete engine[PluginName]
  //   sendMessageToRenderer('plugins-list-update', serializePlugins())
  // })


  // ------------------------------
  // ------------------------------
  // ---- Load Default Plugins ----
  // ------------------------------
  // -------------Main-------------
  // ------------------------------
  isDev && initPlugin("example", example)
  initPlugin("companion", companion)
  initPlugin("multimedia", multimedia)
  // initPlugin("deckpadBase", deckpadBase)
  // ------------------------------
  // ------------------------------
  // ------------------------------
}

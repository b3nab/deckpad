import { dialog, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import { PluginManager } from 'live-plugin-manager'
import PluginClerk from 'pluginclerk'
import pubsub from 'electron-pubsub'
import {
  companion,
  multimedia,
} from '../plugins'

const manager = new PluginManager()
const clerk = new PluginClerk({
  // keyword specified inside package.json:keywords property
  keyword: 'mydeck-plugin',
  // prefix of the plugin to be valid
  prefix: 'mydeck-',
  // function used for logging receives (logLevel, ...message)
  log: isDev ? console.log : null,
  cacheDuration: null,
})

// ---------------------------------
//          Plugins System
// ---------------------------------
export const plugins = ({ store, toIO, sendMessageToRenderer }) => {
  let plugins = {}
  
  
  // ---- Plugin Helpers -----
  // -------------------------
  
  // ---- INIT -----
  const initPlugin = (pluginName, plugin) => {
    console.log(`init plugin: ${pluginName}`)
    const newPlugin = plugin({ store, toIO, sendMessageToRenderer, updateProps })
    newPlugin.start()
    plugins[pluginName] = resolvePlugin(newPlugin)
    return plugins
  }

  // ---- RESOLVE -----
  const resolvePlugin = (pluginFn) => {
    const props = pluginFn.actions()
    return {
      fn: pluginFn,
      props
    }
  }

  // ---- UPDATE -----
  const updatePlugins = () => {
    Object.keys(plugins).map(plugin => {
      plugins[plugin] = resolvePlugin(plugins[plugin].fn)
    })
    sendMessageToRenderer('plugins-installed', serializePlugins())
  }

  // ---- UPDATE FOR PLUGIN -----
  const updateProps = () => {
    updatePlugins()
  }

  // ---- SERIALIZE -----
  const serializePlugins = () => {
    let serialized = {}
    Object.keys(plugins).map(key => {
      serialized[key] = plugins[key].props
    })
    return JSON.parse(JSON.stringify(serialized))
  }
  
  // ------------------------------
  // ------------------------------
  // ---- Load Default Plugins ----
  // ------------------------------
  // -------------Main-------------
  // ------------------------------
  initPlugin("companion", companion)
  initPlugin("multimedia", multimedia)
  // initPlugin("mydeckBase", mydeckBase)
  // ------------------------------
  // ------------------------------
  // ------------------------------
  

  // ---- PubSub Listeners -----
  // ---------------------------
  // with deckServer to call fire() on plugin
  pubsub.subscribe('fire-plugin', async (event, action) => {
    console.log(`fire with action => ${action}`)
    const { plugin, type, options } = action
    const fire = plugins[plugin].props[type].fire
    try {
      await fire(action)
    } catch (error) {
      console.log(error)
      return false
    }
  })
  // ---- IPC Listeners ----
  // -----------------------
  ipcMain.on('plugins-installed', async (event, arg) => {
    sendMessageToRenderer('plugins-installed', serializePlugins())
  })
  ipcMain.on('plugins-available', async (event, arg) => {
    const res = await clerk.fetchPlugins({})
    sendMessageToRenderer('plugins-available', res)
  })
  ipcMain.on('install-plugin', async (event, {name: pluginName, options}) => {
    await manager.install(pluginName)
    const plugin = manager.require(pluginName)
    const plugins = initPlugin(pluginName, plugin)
    sendMessageToRenderer('plugins-list-update', serializePlugins())
  })
  ipcMain.on('remove-plugin', async (event, pluginName) => {
    if(plugins[pluginName].fn.stop) {
      plugins[pluginName].fn.stop()
    }
    await manager.uninstall(pluginName)
    delete plugins[PluginName]
    sendMessageToRenderer('plugins-list-update', serializePlugins())
  })
}

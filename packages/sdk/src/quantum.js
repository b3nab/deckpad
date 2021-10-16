// @deckpad/sdk
// Copyright (c) b3nab
// ---
// --- 
// Quantum
// Internal Engine
// ---
import Hyper from "./hyper"

let board, virtualBoard, store, pubsub, ipcMain
let toConfigurator = () => {}
let toCompanion = () => {}
let toPads = () => {}

// init Quantum and SDK globals
function init(conf) {
  console.log('[QUANTUM] init')
  store = conf.store
  pubsub = conf.pubsub
  ipcMain = conf.ipcMain
  toConfigurator = conf.toConfigurator
  toCompanion = (...params) => pubsub.publish('io', ...params)
  toPads = (...data) => {
    toConfigurator(...data)
    toCompanion(...data)
  }
  // configure Hyper and its itnernal vars
  Hyper.configure({ipcMain, toConfigurator, toCompanion, toPads})

  // pubsub listener on deckServer
  // to call fire() on plugin
  pubsub.subscribe('fire-plugin', async (event, {action, origin}) => {
    // console.log('fired with action => ',action)
    // console.log('fired from origin => ', origin)
    const { plugin, options } = action
    const [plug, act] = plugin.split('=>')
    const pao = {p: plug,a: act,o: options}
    Hyper.fire(pao, origin)
    Hyper.work()
  })
}

export {
  init,
  store,
  pubsub,
  ipcMain,
  toConfigurator,
  toCompanion,
  toPads
}

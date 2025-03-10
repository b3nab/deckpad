// @deckpad/sdk
// Copyright (c) b3nab
// ---
// ---
// Quantum
// Internal Engine
// ---
import Hyper from './hyper'

type TalkToConfiguration = (...args) => void

let board, virtualBoard, store, pubsub, ipcMain, epm, extensionsDir
let toConfigurator: TalkToConfiguration = () => {}
let toCompanion = () => {}
let toPads = () => {}

// init Quantum and SDK globals
function init(conf) {
  console.log('[QUANTUM] init')
  store = conf.store
  pubsub = conf.pubsub
  ipcMain = conf.ipcMain
  epm = conf.ext.epm
  extensionsDir = conf.ext.extensionsDir
  toConfigurator = conf.toConfigurator
  toCompanion = (...params) => pubsub.publish('io', ...params)
  toPads = (...data) => {
    toConfigurator(...data)
    toCompanion(...data)
  }
  // configure Hyper and its itnernal vars
  Hyper.configure({
    ipcMain,
    toConfigurator,
    toCompanion,
    toPads,
    epm,
    extensionsDir,
  })

  // pubsub listener on deckServer
  // to call fire() on plugin
  pubsub.subscribe('fire-plugin', async (event, { action, origin }) => {
    console.log('[PUBSUB] fired with action => ', action)
    console.log('[PUBSUB] fired from origin => ', origin)
    const { plugin, options } = action
    const [plug, act] = plugin.split('=>')
    const pao = { p: plug, a: act, o: options }
    Hyper.fire(pao, origin)
    Hyper.work()
  })
  ipcMain.on('fire-plugin', async (event, { action, origin }) => {
    console.log('[IPC] fired with action => ', action)
    console.log('[IPC] fired from origin => ', origin)
    const { plugin, options } = action
    const [plug, act] = plugin.split('=>')
    const pao = { p: plug, a: act, o: options }
    Hyper.fire(pao, origin)
    Hyper.work()
  })
}

export { init, store, pubsub, ipcMain, toConfigurator, toCompanion, toPads }

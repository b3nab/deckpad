// @deckpad/sdk
// Copyright (c) b3nab
// ---
// --- 
// Hyper
// a plugin manager system
// deeply inspired by React.js and ReactFiber implementation
// ---
import hyperize from './hyperize'

// Hyper
const Hyper = {
  engine: {},
  toConfigurator: null,
  toCompanion: null,
  toPads: null,
  ipcMain: null,

  configure: function({ ipcMain, toConfigurator, toCompanion, toPads }) {
    Hyper.toConfigurator = toConfigurator
    Hyper.toCompanion = toCompanion
    Hyper.toPads = toPads
    Hyper.ipcMain = ipcMain
    const registerBoardWorkersFor = (event) => {
      // console.log('registerBoardWorkersFor => ', event)
      Hyper.ipcMain.on(event, (event, args) => {
        Hyper.work()
      })
    }
    [ // 'update-board',
      'plugins-installed',
    ].forEach(event => registerBoardWorkersFor(event))
  },
  hyperization: function(name, fn) {
    return hyperize(name, fn, {
      toConfigurator: Hyper.toConfigurator,
      toCompanion: Hyper.toCompanion,
      toPads: Hyper.toPads,
      ipcMain: Hyper.ipcMain,
      hydrate: Hyper.hydrate,
      commit: Hyper.commit,
      scheduleUpdate: () => {
        Hyper.engine[name].needUpdate = true
      }
    })
  },
  register: function(name, fn) {
    Hyper.engine[name] = {
      plugin: Hyper.hyperization(name, fn),
      actions: {}
    }
    // Hyper.hydrate(name)
  },
  hydrate: function(name) {
    // console.log('[Hyper] hydrate() => ', name)
    // console.log('[Hyper] hydrate() Hyper is ', Hyper)
    Hyper.setHypeCtx(Hyper.engine[name].plugin)
    Hyper.engine[name].needUpdate = false
    Hyper.engine[name].actions = Hyper.engine[name].plugin.resolve()
    Hyper.setHypeCtx(null)
    if(Hyper.engine[name].needUpdate) Hyper.hydrate(name)
  },
  fire: function(pao, origin) {
    const {p, a, o} = pao
    const {deck, pos} = origin
    console.log('[Hyper] fire() => ', p,a,o)
    Hyper.setHypeCtx(Hyper.engine[p].plugin)
    Hyper.origin = origin
    try {
      isHyperized(p, a)
      const fire = Hyper.engine[p].actions[a].fire
      fire(o)
    } catch (error) {
      error.hyper && Hyper.toPads('toast', error.msg)
      console.log(`firing action ${p} - ${a} : ${error}`)
    } finally {
      Hyper.origin = null
      Hyper.setHypeCtx(null)
    }
  },
  commit: function() {
    Hyper.toConfigurator('plugins-hydrated', Hyper.serializePlugins())
    Hyper.toConfigurator('plugins-installed', Hyper.serializePlugins())
  },
  work: function() {
    Object.keys(Hyper.engine).map(name => Hyper.hydrate(name))
    Hyper.commit()
  },
  serializePlugins: function() {
    let serialized = {}
    Object.keys(Hyper.engine).map(key => {
      serialized[key] = Hyper.engine[key].actions
    })
    return JSON.parse(JSON.stringify(serialized))
  },
  contextualize: function(plug, cb) {
    Hyper.setHypeCtx(Hyper.engine[p].plugin)
  },
  setHypeCtx: function(hype) {
    Hyper.hype = hype
  },
}

export default Hyper

export const isHyperized = (name, action) => {
  if(!Object.keys(Hyper.engine).includes(name)) {
    throw {hyper: true, plugin: name, msg: `missing plugin - ${name} is not registered`}
  }
  if(!Object.keys(Hyper.engine[name].actions).includes(action)) {
    throw {hyper: true, plugin: name, action: action, msg: `missing action - ${name} is registered but ${action} is not exported`}
    // throw `missing action - ${name} is registered but ${action} is not exported`
  }
  return true
}

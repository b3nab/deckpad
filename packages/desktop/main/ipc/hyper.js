import { ipcMain } from 'electron'


const Hyper = {
  engine: {},
  toConfigurator: null,
  toCompanion: null,

  configure: function({ store, toIO, sendMessageToRenderer }) {
    this.toConfigurator = sendMessageToRenderer
    this.toCompanion = toIO
    const registerBoardWorkersFor = (event) => {
      ipcMain.on(event, (event, args) => {
        this.work()
      })
    }

    [
      // 'update-board',
      'plugins-installed',
    ].forEach(event => registerBoardWorkersFor(event))
    
  },

  hyperize: function (name, fn) {
    // console.log(`hyperize => ${name}`)
    // console.log({ Hyper: this })
    const plugin = this.engine[name]
    let idx = 0
    let hooks = []
    let effects = []
    // Hype- maybe something like (so-so) ReactFiber
    return (() => {
      // console.log(`Hype of ${name}`)
 
      const syncLabel = (label) => {
        // engine[pluginName].props['btnLabel'] = label
        console.log('syncLabel(label) => need implementation')

        return [label, ]
      }

      const syncPage = (actualMobile) => {
        this.toConfigurator('switch-deck', actualMobile)
      }

      const dynamic = (event) => ((cb) => {
        // console.log(`[Hyper] dynamic hook for ${event}`)        
        ipcMain.once(event, (event, board) => {
          cb(board)
          this.hydrate(name)
          this.commit()
          // this.work()
        })
      })

      
      const useEffect = (cb, newDeps) => {
        let hasChanged = true
        const oldDeps = hooks[idx]
        if(oldDeps) {
          hasChanged = newDeps.some((dep, i) => !Object.is(dep, oldDeps[i]))
        }
        if(!!!newDeps || hasChanged) {
          cb()
        }
        hooks[idx] = newDeps
        idx++
        // return [state, setState]
      }

      const useState = (initVal) => {
        const _idx = idx
        let state = hooks.length > idx ? hooks[idx] : initVal
        const setState = (newVal) => {
          hooks[_idx] = newVal
        }
        hooks[idx] = state
        idx++
        return [state, setState]
      }

      const useReducer = (actions) => {
        let fireAction = (key) => {
          switch (key) {
            case value:
              
              break;
          
            default:
              break;
          }
        }
        return fireAction
      }

      const hypers = () => ({
        useState,
        useEffect,
        syncPage,
        syncLabel,
        dynamicBoard: dynamic('update-board')
      })

      const resolve = () => {
        idx = 0
        // console.log(`resolving hyperized ${name} - idx ${idx}`)
        // console.log(`${name} - state hooks ${JSON.stringify(hooks, null, 2)}`)
        return fn(hypers())
      }
      return {
        resolve
      }
    })()
  },
  
  register: function (name, fn) {
    this.engine[name] = {
      plugin: this.hyperize(name, fn),
      actions: {}
    }
    this.hydrate(name)
  },
  
  hydrate: function(name) {
    this.engine[name].actions = this.engine[name].plugin.resolve()
  },

  commit: function() {
    this.toConfigurator('plugins-hydrated', this.serializePlugins())
    this.toConfigurator('plugins-installed', this.serializePlugins())
  },
  
  work: function() {
    Object.keys(this.engine).map(name => this.hydrate(name))
    this.commit()
  },
  serializePlugins: function() {
    let serialized = {}
    Object.keys(this.engine).map(key => {
      serialized[key] = this.engine[key].actions
    })
    return JSON.parse(JSON.stringify(serialized))
  }
}

export default Hyper

export const isHyperized = (name, action) => {
  if(!Object.keys(Hyper.engine).includes(name)) {
    throw `missing plugin - ${name} is not registered`
  }
  if(!Object.keys(Hyper.engine[name].actions).includes(action)) {
    throw `missing action - ${name} is registered but ${action} is not exported`
  }
  return true
}

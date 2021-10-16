// @deckpad/sdk
// Copyright (c) b3nab
// ---
// --- 
// Hyper
// a plugin manager system
// deeply inspired by React.js and ReactFiber implementation
// ---
export default function hyperize(name, fn, {
  ipcMain,
  toCompanion,
  toConfigurator,
  hydrate,
  commit,
  scheduleUpdate,
}) {
  console.log(`hyperize => ${name}`)
  // console.log({ hyperize: this })
  // const plugin = this.engine[name]
  let idx = 0
  let efct = 0
  let hooks = []
  let effects = []
  // Hype - maybe something like (so-so) ReactFiber
  return (() => {
    // console.log(`Hype of ${name}`)

    const syncLabel = (label, origin) => {
      console.log(`[HYPERIZE] ${name} - syncLabel() `, label, origin)
      const shadowLabel = {
        [origin.deck]: {
          buttons: {
            [origin.pos.row]: {
              [origin.pos.col]: {
                label: label
              }
            }
          }
        }
      }
      toConfigurator('update-label', shadowLabel)
      toCompanion('update-label', shadowLabel)
    }

    const syncPage = (actualMobile) => {
      toConfigurator('switch-deck', actualMobile)
      toCompanion('switch-deck', actualMobile)
    }

    // Factory of `dynamic*` functions
    // used for building:
    //    - dynamicBoard(callback)
    const dynamic = (event) => ((cb) => {
      // console.log(`[hyperize] dynamic hook for ${event}`)
      ipcMain.once(event, (event, board) => {
        cb(board)
        hydrate(name)
        commit()
      })
    })

    // useEffect Hook
    // use it like React!
    const useEffect = (cb, newDeps) => {
      let hasChanged = true
      const oldDeps = hooks[idx]
      const oldCleanup = effects[efct]
      if(oldDeps) {
        hasChanged = newDeps.some((dep, i) => !Object.is(dep, oldDeps[i]))
      }
      if(!!!newDeps || hasChanged) {
        oldCleanup && oldCleanup()
        effects[efct] = cb()
      }
      hooks[idx] = newDeps
      idx++
      efct++
      // return [state, setState]
    }
    
    // useState Hook
    // use it like React!
    const useState = (initVal) => {
      const _idx = idx
      let state = hooks.length > idx ? hooks[idx] : initVal
      const setState = (newVal) => {
        hooks[_idx] = newVal
        scheduleUpdate()
      }
      hooks[idx] = state
      idx++
      efct++
      return [state, setState]
    }


    // WIP HOOK: useDebounce
    // ----------------------
    const useDebounce = (value, delay = 500) => {
      // State and setters fpr debounced value
      const [debouncedValue, setDebouncedValue] = useState(value);
      
      useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        
        return () => {
          clearTimeout(handler);
        };
      }, [value, delay]);
      
      
      return debouncedValue;
    }
    
    // WIP HOOK: useDebounce
    // ----------------------
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
    
    const resolve = () => {
      idx = 0
      efct = 0
      console.log(`resolving hyperized ${name}`)
      console.log(`state hooks ${JSON.stringify(hooks, null, 2)}`)
      let actions = fn()

      return actions
    }
    return {
      resolve,
      // hooks for dispatcher
      useState,
      useEffect,
      syncPage,
      syncLabel,
      dynamicBoard: dynamic('update-board')
    }
  })()
}
import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'

const ipc = window.electron.ipcRenderer || false

export const useIPCs = ({
  defaultDeck,
  board,
  setBoard,
  resetDeck,
  setSavedNotification,
  setCompanion,
  setActual,
  serverStatus,
  setServerStatus,
  setServerIP,
  setPlugins
}) => {
  // send board (on updates)
  useEffect(() => {
    if (ipc) {
      ipc.send('update-board', board)
    }
  }, [board])

  // ipc first send on app opening
  // useEffect(() => {
  //   if(ipc) {
  //     ipc.send('plugins-installed')
  //   }
  // }, [])

  // ipc communications with main process
  useEffect(() => {
    if (ipc) {
      ipc.on('saved-board', (event, data) => {
        setTimeout(() => {
          setSavedNotification(true)
        }, 500)
        setSavedNotification(false)
      })
      ipc.on('deckpad-ready', (event, data) => {
        loadBoard(true)
        ipc.send('plugins-installed')
      })
      ipc.on('companion', (event, name) => {
        setCompanion(name)
      })
      ipc.on('switch-deck', (event, toIndex) => {
        setActual(toIndex)
      })
      ipc.on('loaded-board', (event, data) => {
        setBoard(validateBoard(data))
        resetDeck()
      })
      ipc.on('started-server', (event, data) => {
        setServerStatus(true)
        setServerIP(data)
      })
      ipc.on('stopped-server', (event, data) => {
        setServerStatus(false)
        setCompanion('')
        setServerIP(false)
      })
      ipc.on('plugins-installed', (event, data) => {
        setPlugins(data)
      })
    }
    return () => {
      if (ipc) {
        ipc.removeAllListeners('deckpad-ready')
        ipc.removeAllListeners('companion')
        ipc.removeAllListeners('switch-deck')
        ipc.removeAllListeners('saved-board')
        ipc.removeAllListeners('loaded-board')
        ipc.removeAllListeners('started-server')
        ipc.removeAllListeners('stopped-server')
        ipc.removeAllListeners('plugins-installed')
      }
    }
  }, [])

  // UTILS F(x)
  const validateBoard = (board) => {
    let oldFormat = false
    board.map((deck) => {
      if (!deck.id) {
        oldFormat = true
        deck.id = uuid()
      }
      deck.buttons.map((row) => {
        row.map((btn) => {
          if (!Object.keys(btn.action).includes('plugin')) {
            oldFormat = true
            btn.action.plugin = null
          }
          if (Object.keys(btn.action).includes('type') && !!btn.action.type) {
            oldFormat = true
            btn.action.plugin = `${btn.action.plugin}=>${btn.action.type}`
          }
          if (Object.keys(btn.action).includes('type')) {
            oldFormat = true
            delete btn.action.type
          }
          if (typeof btn.action.options == 'string') {
            const toPage = btn.action.options
            btn.action.options = {
              toPage: toPage
            }
          }
          if (!!btn.action.plugin && btn.action.plugin.split('=>')[0] == 'multimedia') {
            btn.action.plugin = 'audio=>' + btn.action.plugin.split('=>')[1]
            oldFormat = true
          }
        })
      })
    })

    console.log(`validating board.. is oldFormat? ${oldFormat}`)
    console.log('board now is ', board)
    oldFormat && saveBoard(board)
    return board
  }

  const sendIPC = (name, ...args) => {
    if (ipc) {
      ipc.send(name, ...args)
    }
  }
  // IPCs functions to export
  const newBoard = () => {
    setBoard([defaultDeck])
    resetDeck()
  }
  const loadBoard = (latest = false) => {
    sendIPC('load-board', latest)
  }
  const reloadBoard = (latest = true) => {
    sendIPC('load-board', latest)
  }
  const saveBoard = (file = board) => {
    sendIPC('save-board', file)
  }
  const saveBoardAs = () => {
    sendIPC('save-board-as', board)
  }
  const serverStartStop = () => {
    serverStatus ? sendIPC('stop-server') : sendIPC('start-server')
  }

  return {
    sendIPC,
    newBoard,
    loadBoard,
    reloadBoard,
    saveBoard,
    saveBoardAs,
    serverStartStop
  }
}

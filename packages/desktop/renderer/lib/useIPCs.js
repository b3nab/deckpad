import { useEffect } from 'react'
import electron from 'electron'
import {v4 as uuid } from 'uuid'


const ipc = electron.ipcRenderer || false

export const useIPCs = ({
  defaultDeck, decks, setDecks, resetDeck,
  setSavedNotification,
  setCompanion,
  setActual,
  serverStatus, setServerStatus,
  setServerIP,
  setPlugins,
}) => {

  // send board (on updates)
  useEffect(() => {
    if(ipc){
      ipc.send('update-board', decks)
    }
  }, [decks])


  // ipc first send on app opening
  // useEffect(() => {
  //   if(ipc) {
  //     ipc.send('plugins-installed')
  //   }
  // }, [])
  
  // ipc communications with main process
  useEffect(() => {
    if(ipc) {
      ipc.on('saved-board', (event, data) => { 
        setTimeout(() => {
          setSavedNotification(true)    
        }, 500)
        setSavedNotification(false)
      })
      ipc.on('deckpad-ready', (event, data) => { loadBoard(true); ipc.send('plugins-installed') })
      ipc.on('companion', (event, name) => { setCompanion(name) })
      ipc.on('switch-deck', (event, toIndex) => { setActual(toIndex) })
      ipc.on('loaded-board', (event, data) => { setDecks(validateBoard(data)); resetDeck() })
      ipc.on('started-server', (event, data) => { setServerStatus(true); setServerIP(data) })
      ipc.on('stopped-server', (event, data) => { setServerStatus(false); setCompanion(''); setServerIP(false) })
      ipc.on('plugins-installed', (event, data) => { setPlugins(data) })
    }
    return () => {
      if(ipc) {
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
    board.map(deck => {
      if(!deck.id) {
        oldFormat = true
        deck.id = uuid()
      }
    })
    return board
  }

  const sendIPC = (name, ...args) => {
    if(ipc) {
      ipc.send(name, ...args)
    }
  }
  // IPCs functions to export
  const newBoard = () => { setDecks([defaultDeck]); resetDeck() }
  const loadBoard = (latest=false) => { sendIPC('load-board', latest) }
  const reloadBoard = (latest=true) => { sendIPC('load-board', latest) }
  const saveBoard = () => { sendIPC('save-board', decks) }
  const saveBoardAs = () => { sendIPC('save-board-as', decks) }
  const serverStartStop = () => { serverStatus ? sendIPC('stop-server') : sendIPC('start-server') }

  
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
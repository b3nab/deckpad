import { useState, useEffect } from 'react'
import electron from 'electron'
import {v4 as uuid } from 'uuid'

import { useIPCs } from './useIPCs'


const ipc = electron.ipcRenderer || false

export const useMyDeck = ({ maxCol, maxRow, }) => {
  const defaultDeck = {
    id: uuid(),
    name: 'Deck Page',
    col: 4,
    row: 3,
    buttons: Array(maxRow).fill().map(() => Array(maxCol).fill({
      bgColor: { r: 0, g: 0, b: 0, a: 1 },
      label: "",
      labelColor: { r: 1, g: 1, b: 1, a: 1 },
      shape: "square", // [ circle, square, none ]
      image: "",
      action: {
        plugin: null,
        type: null,
        options: {}
      }
    }))
  }
  const [ btn, setBtn ] = useState()
  const [ decks, setDecks ] = useState([defaultDeck])
  const [ actual, setActual ] = useState(0)
  const [ serverIP, setServerIP ] = useState(false)
  const [ plugins, setPlugins ] = useState([])
  const [ showSaved, setSavedNotification ] = useState(false)
  const [ showSettings, setShowSettings ] = useState(false)
  const [ showExtensions, setShowExtensions ] = useState(false)
  const [ serverStatus, setServerStatus ] = useState(false)
  const [ companionName, setCompanion ] = useState('')

  const resetDeck = () => {
    setBtn()
    setActual(0)
  }

  // hook useIPCs
  const {
    sendIPC,
    newBoard,
    loadBoard,
    reloadBoard,
    saveBoard,
    saveBoardAs,
    serverStartStop
  } = useIPCs({
    defaultDeck, decks, setDecks, resetDeck,
    setSavedNotification,
    setCompanion,
    setActual,
    serverStatus, setServerStatus,
    setServerIP,
    setPlugins,
  })

  useEffect(() => {
    setBtn()
  }, [actual])

  // Functions
  const addPage = () => {
    let newPage = {...defaultDeck}
    newPage.id = uuid()
    newPage.name += ` ${decks.length+1}`
    setDecks([...decks, newPage])
    setActual(decks.length)
  }
  const deletePage = () => {
    if(decks.length > 1) {
      let pages = decks.filter(item => item !== decks[actual])
      setDecks(pages)
      setActual(actual === 0 ? 0 : actual-1)
    }
  }
  const updateActualDeck = (newPage) => {
    let pages = [...decks]
    pages[actual] = newPage
    setDecks(pages)
  }
  const updateCol = (n) => {
    const newCol = Number(n)
    updateActualDeck({...decks[actual], col: newCol})
  }
  const updateRow = (n) => {
    const newRow = Number(n)
    updateActualDeck({...decks[actual], row: newRow})
  }
  const saveBtn = (btnProps) => {
    console.log('btn to save: ', btnProps)
    let newDeck = decks[actual]
    newDeck.buttons[btn.row][btn.col] = btnProps
    updateActualDeck(newDeck)
  }
  

  
  return {
    // useIPCs exports
    sendIPC,
    newBoard,
    loadBoard,
    reloadBoard,
    saveBoard,
    saveBoardAs,
    serverStartStop,
    // useMyDeck exports
    maxCol, maxRow, defaultDeck,
    btn, setBtn, saveBtn,
    decks, setDecks,
    actual, setActual,
    serverIP, setServerIP,
    plugins, setPlugins,
    showSaved, setSavedNotification,
    showSettings, setShowSettings, 
    showExtensions, setShowExtensions,
    serverStatus, setServerStatus,
    companionName, setCompanion,
    addPage, deletePage, updateActualDeck, updateCol, updateRow,
  }
}
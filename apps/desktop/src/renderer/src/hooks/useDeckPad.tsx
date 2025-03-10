import { useState, useEffect, createContext, useContext, Context } from 'react'
import { v4 as uuid } from 'uuid'
import { useIPCs } from './useIPCs'

type useDeckpadOptions = {
  maxCol: number
  maxRow: number
}

const ipc = window.electron.ipcRenderer || false

export const DeckPadContext = createContext<any | null>(null)

export function DeckPadContextProvider({ children }) {
  const deckpadEngine = useDeckPadEngine({ maxCol: 15, maxRow: 10 })
  return (
    <DeckPadContext.Provider
    value={{...deckpadEngine}}>
    {children}
    </DeckPadContext.Provider>
  )
}

export const useDeckPad = (opts?: useDeckpadOptions) => {
  const deckpadEngine = useContext(DeckPadContext)
  if(!deckpadEngine) {
    throw new Error(
      "useDeckPad must be used within a DeckPadContextProvider"
    )
  }
  return deckpadEngine
}

export const useDeckPadEngine = ({ maxCol, maxRow }) => {
  const defaultDeck = {
    id: uuid(),
    name: 'Deck Page',
    col: 4,
    row: 3,
    buttons: Array(maxRow)
      .fill({})
      .map(() =>
        Array(maxCol).fill({
          bgColor: { r: 0, g: 0, b: 0, a: 1 },
          label: '',
          labelColor: { r: 1, g: 1, b: 1, a: 1 },
          shape: 'square', // [ circle, square, none ]
          image: '',
          action: {
            plugin: null,
            options: {}
          }
        })
      )
  }
  const [btn, setBtn] = useState<any | undefined>()
  const [board, setBoard] = useState([defaultDeck])
  const [actual, setActual] = useState(0)
  const [serverIP, setServerIP] = useState(false)
  const [plugins, setPlugins] = useState([])
  const [showSaved, setSavedNotification] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExtensions, setShowExtensions] = useState(false)
  const [serverStatus, setServerStatus] = useState(false)
  const [companionName, setCompanion] = useState('')

  const resetDeck = () => {
    setBtn()
    setActual(0)
  }

  // hook useIPCs
  const { sendIPC, newBoard, loadBoard, reloadBoard, saveBoard, saveBoardAs, serverStartStop } =
    useIPCs({
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
    })

  useEffect(() => {
    setBtn()
  }, [actual])

  // Functions
  const addPage = () => {
    let newPage = { ...defaultDeck }
    newPage.id = uuid()
    newPage.name += ` ${board.length + 1}`
    setBoard([...board, newPage])
    setActual(board.length)
  }
  const deletePage = () => {
    if (board.length > 1) {
      let pages = board.filter((item) => item !== board[actual])
      setBoard(pages)
      setActual(actual === 0 ? 0 : actual - 1)
    }
  }
  const updateActualDeck = (newPage) => {
    let pages = [...board]
    pages[actual] = newPage
    setBoard(pages)
  }
  const updateCol = (n) => {
    const newCol = Number(n)
    updateActualDeck({ ...board[actual], col: newCol })
  }
  const updateRow = (n) => {
    const newRow = Number(n)
    updateActualDeck({ ...board[actual], row: newRow })
  }
  const saveBtn = (btnProps) => {
    console.log('btn to save: ', btnProps)
    let newDeck = board[actual]
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
    // useDeckPad exports
    maxCol,
    maxRow,
    defaultDeck,
    btn,
    setBtn,
    saveBtn,
    board,
    setBoard,
    actual,
    setActual,
    serverIP,
    setServerIP,
    plugins,
    setPlugins,
    showSaved,
    setSavedNotification,
    showSettings,
    setShowSettings,
    showExtensions,
    setShowExtensions,
    serverStatus,
    setServerStatus,
    companionName,
    setCompanion,
    addPage,
    deletePage,
    updateActualDeck,
    updateCol,
    updateRow
  }
}

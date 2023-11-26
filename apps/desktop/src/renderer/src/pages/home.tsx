import { Settings, Extensions } from '../components/modals'
import { BtnConfig } from '../components/BtnConfig'
import { DeckBar } from '../components/DeckBar'
import { Deck } from '../components/Deck'
import { Side } from '../components/Side'
import { useDeckPad } from '../lib/useDeckPad'

export const Home: () => JSX.Element = () => {
  // const classes = useStyles()
  const {
    sendIPC,
    newBoard,
    loadBoard,
    // reloadBoard,
    saveBoard,
    saveBoardAs,
    serverStartStop,
    maxCol,
    maxRow,
    //   defaultDeck,
    btn,
    setBtn,
    saveBtn,
    board,
    //   setBoard,
    actual,
    setActual,
    serverIP,
    //   setServerIP,
    //   showSaved,
    //   setSavedNotification,
    showSettings,
    setShowSettings,
    plugins,
    //   setPlugins,
    showExtensions,
    setShowExtensions,
    serverStatus,
    //   setServerStatus,
    companionName,
    //   setCompanion,
    addPage,
    deletePage,
    updateActualDeck,
    updateCol,
    updateRow
  } = useDeckPad({ maxCol: 15, maxRow: 10 })

  const serverStartStopText = serverStatus ? 'STOP ' : 'START '

  return (
    <main className="flex h-screen p-4 bg-black">
      {/* <Settings showSettings={showSettings} close={() => setShowSettings(false)} />
      <Extensions
        showExtensions={showExtensions}
        plugins={plugins}
        close={() => setShowExtensions(false)}
      /> */}
      <div className="flex h-full flex-1 flex-row">
        <div className="flex flex-1 flex-col">
          <DeckBar />
          <Deck />
          {/* <BtnConfig btn={btn} saveBtn={saveBtn} plugins={plugins} /> */}
          {/* <div className={clsx([classes.flex, classes.DeckPaper])}>
          </div>
          <div>
          </div> */}
        </div>
        <Side />
      </div>
    </main>
  )
}

export default Home

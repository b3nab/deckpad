import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { CssBaseline, Grid, Box } from '@material-ui/core'

import { useStyles } from '../lib/useStyles'
import { useDeckPad } from '../lib/useDeckPad'

import { DeckBar } from '../components/DeckBar'
import { Deck } from '../components/Deck'
import { BtnConfig } from '../components/BtnConfig'
import { Side } from '../components/Side'

import { Settings, Extensions } from '../components/modals'

function Home() {
  const classes = useStyles()
  const { 
    sendIPC,
    newBoard,
    loadBoard,
    reloadBoard,
    saveBoard,
    saveBoardAs,
    serverStartStop,
    maxCol, maxRow, defaultDeck,
    btn, setBtn, saveBtn,
    board, setBoard,
    actual, setActual,
    serverIP, setServerIP,
    showSaved, setSavedNotification,
    showSettings, setShowSettings,
    plugins, setPlugins,
    showExtensions, setShowExtensions,
    serverStatus, setServerStatus,
    companionName, setCompanion,
    addPage, deletePage, updateActualDeck, updateCol, updateRow,
  } = useDeckPad({ maxCol: 15, maxRow: 10 })
  const openBtnConfig = conf => {
    setBtn()
    setBtn(conf)
  }

  const serverStartStopText = serverStatus ? 'STOP ' : 'START '
  
  return (
    <Box className={classes.root} p={2}>
      {/* <CssBaseline /> */}
      <Settings
        showSettings={showSettings}
        close={() => setShowSettings(false) }
      />
      <Extensions
        showExtensions={showExtensions}
        plugins={plugins}
        close={() => setShowExtensions(false) }
      />
      <Grid container spacing={2}>
        <Grid container item spacing={2} className={classes.content}>
          <Grid item>
            <DeckBar 
              newBoard={newBoard}
              loadBoard={loadBoard}
              saveBoard={saveBoard}
              saveBoardAs={saveBoardAs}
              openSettings={() => setShowSettings(true)}
              openExtensions={() => setShowExtensions(true)}
              />
            </Grid>
          <Grid item className={classes.DeckPaper}>
            <Deck board={board} actual={actual} updateDeck={updateActualDeck} openBtnConfig={openBtnConfig} />
          </Grid>
          <Grid container item>
            <BtnConfig btn={btn} saveBtn={saveBtn} plugins={plugins} />
          </Grid>
        </Grid>
        <Grid container item>
          <Side
            board={board}
            actual={actual}
            setActual={setActual}
            addPage={addPage}
            deletePage={deletePage}
            maxCol={maxCol}
            maxRow={maxRow}
            updateCol={updateCol}
            updateRow={updateRow}
            updateActualDeck={updateActualDeck}
            serverStartStop={serverStartStop}
            serverStartStopText={serverStartStopText}
            serverIP={serverIP}
            stats={{
              companionName,
              serverStatus,
            }}
            plugins={plugins}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home

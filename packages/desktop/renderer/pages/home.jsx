import electron from 'electron'
import {v4 as uuid } from 'uuid'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  TextField,
  Button,
  Fab 
} from '@material-ui/core'
import { 
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import { Deck } from '../components/Deck'

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    height: '100vh',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    // padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: 0,
  },
}))

export default function Home() {
  const classes = useStyles()
  const maxCol = 15
  const maxRow = 10
  const defaultDeck = {
    id: uuid(),
    name: 'Deck Page',
    col: 4,
    row: 3,
    buttons: Array(maxRow).fill().map(() => Array(maxCol).fill({
      bgColor: "#000000",
      label: "",
      labelColor: "#FFFFFF",
      shape: "square", // [ circle, square, none ]
      image: "",
      action: {
        plugin: null,
        type: null,
        options: {}
      }
    }))
  }
  const [decks, setDecks] = useState([defaultDeck])
  const [actual, setActual] = useState(0)
  const [ serverStatus, setServerStatus ] = useState(false)
  const [ showSaved, setSavedNotification ] = useState(false)

  const serverStartStopText = serverStatus ? 'STOP ' : 'START '

  useEffect(() => {
    if(ipc){
      ipc.send('update-board', decks)
    }
  }, [decks])

  useEffect(() => {
    if(ipc) {
      ipc.on('saved-board', (event, data) => { 
        setTimeout(() => {
          setSavedNotification(true)    
        }, 500)
        setSavedNotification(false)
      })
      ipc.on('mydeck-ready', (event, data) => { loadBoard(true) })
      ipc.on('loaded-board', (event, data) => { setDecks(validateBoard(data)) })
      ipc.on('started-server', (event, data) => { setServerStatus(true) })
      ipc.on('stopped-server', (event, data) => { setServerStatus(false) })
    }
    return () => {
      if(ipc) {
        ipc.removeAllListeners('mydeck-ready')
        ipc.removeAllListeners('saved-board')
        ipc.removeAllListeners('loaded-board')
        ipc.removeAllListeners('started-server')
        ipc.removeAllListeners('stopped-server')
      }
    }
  }, [])

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

  const loadBoard = (latest=false) => {
    if(ipc) {
      ipc.send('load-board', latest)
    }
  }
  const saveBoard = () => {
    if(ipc) {
      ipc.send('save-board', decks)
    }
  }
  const saveBoardAs = () => {
    if(ipc) {
      ipc.send('save-board-as', decks)
    }
  }
  const serverStartStop = () => {
    if(ipc) {
      if(serverStatus) {
        ipc.send('stop-server')
      } else {
        ipc.send('start-server')
      }
    }
  }

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <Button onClick={() => loadBoard()}>LOAD</Button>
          <Button onClick={() => saveBoard()}>SAVE</Button>
          <Button onClick={() => saveBoardAs()}>SAVE AS..</Button>
          <Button onClick={() => serverStartStop()}>{serverStartStopText} SERVER</Button>
        </div>
        <Divider />
        <List>
          {decks.map((page, index) => (
            <ListItem button key={index} onClick={() => setActual(index)}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Fab 
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => addPage()}>
          <AddIcon />
        </Fab>
      </Drawer>
      <main className={classes.content}>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            {/* <Typography variant="h6" noWrap>
              {decks[actual].name}
            </Typography> */}
            <TextField
              id="page-name"
              label="Name"
              type="text"
              // InputLabelProps={{
              //   shrink: true,
              // }}
              value={decks[actual].name}
              onChange={(e) => updateActualDeck({...decks[actual], name: e.target.value})}
              // variant="filled"
            />
            <Button onClick={() => deletePage()}>
              <DeleteIcon />
            </Button>
          </Toolbar>
          <Toolbar>
            <TextField
              style={{maxWidth: 100}}
              id="page-col"
              label="Columns"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={decks[actual].col}
              onChange={(e) => updateCol(e.target.value >= maxCol ? maxCol : (e.target.value < 0 ? 0 : e.target.value))}
              variant="filled"
            />
            <TextField
              style={{maxWidth: 100}}
              id="page-row"
              label="Rows"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={decks[actual].row}
              onChange={(e) => updateRow(e.target.value >= maxRow ? maxRow : (e.target.value < 0 ? 0 : e.target.value))}
              variant="filled"
            />
          </Toolbar>
        </AppBar>
        <Deck deck={decks[actual]} updateDeck={updateActualDeck} />
      </main>
    </div>
  )
}
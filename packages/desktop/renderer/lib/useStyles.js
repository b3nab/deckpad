import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 270

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  appBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  drawer: {
    display: 'flex',
    flexDirection: 'row',
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    width: drawerWidth,
    // padding: '15px 15px 7.5px 0',
    // marginTop: theme.spacing(1),
    // padding: '5px 15px 15px 0',
  },
  // necessary for content to be below app bar
  toolbar: {
    // ...theme.mixins.toolbar,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    // padding: '15px',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  textCenter: {
    textAlign: 'center',
  },
  fab: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: 0,
  },

  DeckPaper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  // GENERAL STYLE
  fullHeight: {
    height: '100%',
  },
  flex: {
    display: 'flex',
  },
  flexGrow: {
    flex: '1',
  },
  flexEvenly: {
    justifyContent: 'space-evenly',
  }
}))
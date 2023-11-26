import { makeStyles } from '@mui/styles'

const drawerWidth = 270

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  rootGrid: {
    height: '100%',
    flex: 1,
    flexDirection: 'row'
  },

  rootMain: {
    flex: 1,
    flexDirection: 'column'
  },
  rootSide: {
    flexDirection: 'column'
  },

  flex: {
    display: 'flex'
  },

  pluginInputs: {
    margin: '0.5rem 0'
  }
}))

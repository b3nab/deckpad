import { createTheme } from '@mui/material/styles'

const colors = {
  fucsia: '#F02BAD',
  indaco: '#3D5AD5',
  blue: '#2B7FE2',
  cyan: '#00D1FF'
}
export const theme = createTheme({
  shape: {
    borderRadius: 15
  },
  // divider: 'transparent',
  palette: {
    mode: 'dark',
    primary: {
      // main: '#1098AD',
      // main: '#556cd6',
      // main: '#33E1ED',
      main: '#FFFFFF'
      // DECKPAD THEME
      // main: colors.cyan,
    },
    secondary: {
      // main: '#524EEE',
      // main: '#19857b',
      // main: '#000000',
      main: colors.blue
    },
    error: {
      main: '#EF4E7B'
    },
    success: {
      main: '#07B39B'
    },
    background: {
      default: '#030303',
      // paper: '#050709',
      paper: '#070709'
      // COLORS FROM FIGMA DESIGN
      // default: '#000000',
      // paper: '#151520',
      // BASIC DARK COLORS
      // default: '#121212',
      // paper: '#18191A',
      // DECKPAD THEME
      // default: '#070716',
      // paper: '#03030B',
      // paper: '#040D17',
    },
    text: {
      primary: '#FFFFFF'
    }
  },
  typography: {
    button: {
      lineHeight: 1.35
    }
  }
  // overrides: {
  //   MuiDrawer: {
  //     paperAnchorDockedRight: {
  //       borderLeft: 'none'
  //     }
  //   },
  //   MuiButton: {
  //     contained: {
  //       borderRadius: '50px'
  //     }
  //     // sizeSmall: {
  //     // },
  //   },
  //   MuiGrid: {
  //     root: {
  //       display: 'flex'
  //     },
  //     container: {
  //       width: 'auto',
  //       flexWrap: 'initial'
  //     },
  //     display: 'flex'
  //   },
  //   MuiTabPanel: {
  //     root: {
  //       padding: '0'
  //     }
  //   }
  // }
})

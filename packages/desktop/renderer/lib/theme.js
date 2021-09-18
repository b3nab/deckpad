import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const theme = createTheme({
  shape: {
    borderRadius: 15,
  },
  divider: 'transparent',
  palette: {
    type: 'dark',
    primary: {
      // main: '#1098AD',
      // main: '#556cd6',
      // main: '#33E1ED',
      main: '#FFFFFF',
    },
    secondary: {
      // main: '#524EEE',
      // main: '#19857b',
      main: '#000000',
    },
    error: {
      main: '#EF4E7B',
    },
    success: {
      main: '#07B39B',
    },
    background: {
      // COLORS FROM FIGMA DESIGN
      // default: '#000000',
      // paper: '#151520',
      // default: '#2D2D44',
      // paper: '#1E1E2C',
      // NEW COLORS DARK THEME
      default: '#121212',
      paper: '#18191A',
    },
    text: {
      primary: '#FFFFFF',
    }
  },
  typography: {
    button: {
      lineHeight: 1.35
    }
  },
  overrides: {
    MuiDrawer: {
      paperAnchorDockedRight: {
        borderLeft: 'none',
      }
    },
    MuiButton: {
      contained: {
        borderRadius: '50px',
      },
      // sizeSmall: {
      // },
    },
    MuiGrid: {
      root: {
        display: 'flex'
      },
      container: {
        width: 'auto',
        flexWrap: 'initial',
      },
      display: 'flex'
    },
    MuiTabPanel: {
      root: {
        padding: '0',
      }
    }
  }
});

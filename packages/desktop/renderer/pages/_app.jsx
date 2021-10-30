import React from 'react'
import Head from 'next/head'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '../lib/theme'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DeckProvider } from '../components/DeckContext'


function MyApp({Component, pageProps}) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>DeckPad - Board Configurator</title>
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DndProvider backend={HTML5Backend}>
            <DeckProvider>
              <Component {...pageProps} />
            </DeckProvider>
          </DndProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
}


export default MyApp
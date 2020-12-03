import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from '../lib/theme'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DeckProvider } from '../components/DeckContext'


export default function(props) {
  const { Component, pageProps } = props

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
        <title>MyDeck - Board Configurator</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndProvider backend={HTML5Backend}>
          <DeckProvider>
            <Component {...pageProps} />
          </DeckProvider>
        </DndProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

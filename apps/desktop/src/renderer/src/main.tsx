import React from 'react'
import ReactDOM from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './assets/index.css'
import App from './App'
// import { DeckProvider } from './components/DeckContext'
import { DeckPadContextProvider } from './lib/useDeckPad'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <DeckPadContextProvider>
        <App />
      </DeckPadContextProvider>
    </DndProvider>
  </React.StrictMode>
)

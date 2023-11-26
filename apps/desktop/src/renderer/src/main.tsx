import React from 'react'
import ReactDOM from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './assets/index.css'
import App from './App'
import { DeckProvider } from './components/DeckContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <DeckProvider>
        <App />
      </DeckProvider>
    </DndProvider>
  </React.StrictMode>
)

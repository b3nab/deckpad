import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DeckProvider } from './components/DeckContext'
import { Extensions, Settings } from './components/modals'
import { DeckPadContextProvider } from './hooks/useDeckPad'
import { Home } from './pages/home'

function Providers({ children }: { children: React.ReactElement }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <DeckPadContextProvider>
        {children}
      </DeckPadContextProvider>
    </DndProvider>
  )
}

function App(): JSX.Element {
  return (
    <Providers>
      <>
        {/* Modals and Popups */}
        <Settings />
        <Extensions />

        {/* Pages */}
        <Home />
      </>
    </Providers>
  )
}

export default App

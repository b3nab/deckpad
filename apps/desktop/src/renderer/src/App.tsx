import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DeckProvider } from './components/DeckContext'
import { Extensions, Settings } from './components/modals'
import { DeckPadContextProvider } from './hooks/useDeckPad'
import { Home } from './pages/home'
import { TooltipProvider } from './shadcn/ui/tooltip'
import { ThemeProvider } from './providers/theme.provider'
import { SideBarProvider } from './providers/side-bar.provider'

function Providers({ children }: { children: React.ReactElement }) {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='deckpad-ui-theme'>
      <SideBarProvider>
        <DndProvider backend={HTML5Backend}>
          <DeckPadContextProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </DeckPadContextProvider>
        </DndProvider>
      </SideBarProvider>
    </ThemeProvider>
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

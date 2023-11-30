import { Settings, Extensions } from '../components/modals'
import { BtnConfig } from '../components/BtnConfig'
import { DeckBar } from '../components/DeckBar'
import { Deck } from '../components/Deck'
import { Side } from '../components/Side'
import { useDeckPad } from '../lib/useDeckPad'

export const Home: () => JSX.Element = () => {
  const { serverStatus } = useDeckPad({ maxCol: 15, maxRow: 10 })

  return (
    <main className="flex h-screen p-4 bg-black">
      <Settings />
      <Extensions />
      <div className="flex h-full flex-1 flex-row">
        <div className="flex flex-1 flex-col">
          <DeckBar />
          <Deck />
          {/* <BtnConfig btn={btn} saveBtn={saveBtn} plugins={plugins} /> */}
        </div>
        <Side />
      </div>
    </main>
  )
}

export default Home

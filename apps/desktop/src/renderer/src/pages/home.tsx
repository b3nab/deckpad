import { BtnConfig, Deck } from '@renderer/components'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@renderer/shadcn/ui/resizable'
import Page from '@renderer/ui/layout/page'

export const Home: () => JSX.Element = () => {
  return (
    <Page>
      <ResizablePanelGroup direction="vertical" className="h-full">
        <ResizablePanel defaultSize={550} minSize={30}>
          <Deck />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={150}>
          <BtnConfig />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Page>
  )
}

export default Home

import { useState } from 'react'
import { BtnConfig, DeckBar, Deck, Side } from '@renderer/components'
import { useDeckPad } from '../hooks/useDeckPad'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@renderer/shadcn/ui/resizable'
import { Separator } from '@renderer/shadcn/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/shadcn/ui/tabs'
import { Input } from '@renderer/shadcn/ui/input'
import { cn } from '@renderer/lib/utils'
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

export const NewHome: () => JSX.Element = () => {
  const { serverStatus } = useDeckPad({ maxCol: 15, maxRow: 10 })
  const [isCollapsed, setIsCollapsed] = useState(false)

  const accounts = null
  const mails = null
  const defaultLayout = [265, 440, 655]
  const defaultCollapsed = false
  const navCollapsedSize = 4

  return (
    <Page>
      <section className="flex h-full">

        <ResizablePanelGroup
          direction="horizontal"
          // onLayout={(sizes: number[]) => {
          //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
          // }}
          className="flex h-full"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            // collapsible={true}
            minSize={15}
            maxSize={40}
            // onCollapse={(collapsed) => {
            //   setIsCollapsed(collapsed)
            //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            //     collapsed
            //   )}`
            // }}
            className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
          >
            <Side />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>

            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <DeckBar />
                <Deck />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={defaultLayout[2]}>
                <BtnConfig />
              </ResizablePanel>
            </ResizablePanelGroup>

          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </Page>
  )
}

export default Home

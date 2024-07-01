import { useState } from 'react'
import { Side } from '@renderer/components'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@renderer/shadcn/ui/resizable'
import { cn } from '@renderer/lib/utils'
import ActivityBar from './activity-bar'
import { Header } from './header'

const Page = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  // const defaultLayout = [265, 440, 250]
  // default sizes
  const collapsedSidebarSize = 0
  const defaultSidebarSize = 210
  const defaultContentSize = 400
  const minContentSize = 250

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <main className="relative flex flex-1 flex-row bg-muted/40">
        <ActivityBar />
        <ResizablePanelGroup
          direction="horizontal"
          // onLayout={(sizes: number[]) => {
          //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
          // }}
          className="flex h-full w-full"
        >
          <ResizablePanel
            defaultSize={defaultSidebarSize}
            collapsedSize={collapsedSidebarSize}
            collapsible={true}
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
          <ResizablePanel defaultSize={defaultContentSize} minSize={30}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  )
}
export default Page

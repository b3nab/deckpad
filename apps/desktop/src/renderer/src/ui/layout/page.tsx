import { useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@renderer/shadcn/ui/resizable'
import { cn } from '@renderer/lib/utils'
import ActivityBar from './activity-bar'
import { Header } from './header'
import { SideBar } from './side-bar'

interface PageProps {
  children?: React.ReactElement | React.ReactElement[] | React.ReactNode
}

const Page = ({ children }: PageProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header />
      <main className="flex flex-row flex-grow w-full bg-muted/40">
        <ActivityBar />
        <ResizablePanelGroup
          className="flex w-full"
          direction="horizontal"
        >
          <ResizablePanel
            className={cn(isCollapsed && 'min-w-[200px] transition-all duration-300 ease-in-out')}
            defaultSize={180}
            collapsedSize={0}
            collapsible={true}
            minSize={12}
          >
            <SideBar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={50}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  )
}
export default Page

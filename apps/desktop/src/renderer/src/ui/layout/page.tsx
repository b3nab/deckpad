import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@renderer/shadcn/ui/resizable'
import ActivityBar from './activity-bar'
import { Header } from './header'
import { SideBar } from './side-bar'
import { useSideBar } from '@renderer/providers/side-bar.provider'

interface PageProps {
  children?: React.ReactElement | React.ReactElement[] | React.ReactNode
}

const Page = ({ children }: PageProps) => {
  const { ref: refSidePanel, dispatch } = useSideBar()
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
            defaultSize={22}
            collapsedSize={0}
            collapsible={true}
            onCollapse={() => dispatch({ type: 'PRIVATE_SET_IS_OPEN', payload: false })}
            onExpand={() => dispatch({ type: 'PRIVATE_SET_IS_OPEN', payload: true })}
            minSize={15}
            ref={refSidePanel}
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

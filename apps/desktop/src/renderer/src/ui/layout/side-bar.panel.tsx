import { useState } from 'react'
import { Button } from '@renderer/shadcn/ui/button'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Separator } from '@renderer/shadcn/ui/separator'
import { ScrollArea } from '@renderer/shadcn/ui/scroll-area'
import { ResizableHandle, ResizablePanel } from '@renderer/shadcn/ui/resizable'
import { cn } from '@renderer/lib/utils'

interface SideBarPanelProps {
  title: string
  children: React.ReactElement | React.ReactElement[]
}

const SideBarPanel = ({ title, children }: SideBarPanelProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="w-full justify-start rounded-none px-2"
      >
        {isOpen ? <ChevronDown /> : <ChevronRight />}
        <h4 className="truncate text-sm font-semibold">{title}</h4>
      </Button>
      <ResizablePanel
        id={`panel-${title}`}
        className={cn(
          'w-full',
          !isOpen && '!flex-grow-0',
          isOpen && 'transition duration-300 ease-in-out'
        )}
        minSize={20}
      >
        <ScrollArea type="always" className="w-full h-full flex-shrink">
          {children}
        </ScrollArea>
      </ResizablePanel>
      {isOpen ?
        <ResizableHandle /> :
        <Separator />
      }
    </>
  )
}
export default SideBarPanel

import { Separator } from '@renderer/shadcn/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/shadcn/ui/tabs'
import { Input } from '@renderer/shadcn/ui/input'
import { cn } from '@renderer/lib/utils'
import { Button } from '@renderer/shadcn/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/shadcn/ui/tooltip'
import {
  ToyBrick,
  Blocks,
  Settings2,
  Layers,
  CircleUserRound
} from 'lucide-react'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { SIDE_ACTION, useSideBar } from '@renderer/providers/side-bar.provider'

const ActivityBar = () => {
  const { setShowSettings, setShowExtensions } = useDeckPad()
  const { state: stateSideBar, dispatch } = useSideBar()

  const toggleSidePanel = () => {
    if (stateSideBar.isOpen) {
      dispatch({ type: SIDE_ACTION.CLOSE })
    } else {
      dispatch({ type: SIDE_ACTION.OPEN })
    }
  }

  const fireActionByPanel = (panel: string, action?: Function) => {
    stateSideBar.panel === panel.toLowerCase()
      ? toggleSidePanel()
      : (
        dispatch({ type: SIDE_ACTION.OPEN }),
        dispatch({ type: SIDE_ACTION.SET_PANEL, panel: panel.toLowerCase() }),
        action && action()
      )
  }

  const menuActivityBar = [
    {
      name: 'Pages',
      icon: <Layers className="size-5" />,
    },
    {
      name: 'Actions',
      icon: <ToyBrick className="size-5" />,
    },
    {
      name: 'Extensions',
      icon: <Blocks className="size-5" />,
      action: () => setShowExtensions(true)
    }
  ]

  return (
    <aside className="flex flex-col flex-grow border-r">
      <nav className="grid gap-1 p-2">
        {menuActivityBar.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Button
                onClick={() => fireActionByPanel(item.name, item.action)}
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-lg',
                  stateSideBar.isOpen && stateSideBar.panel === item.name.toLowerCase() &&
                    'bg-black relative before:absolute before:bg-success before:w-1 before:h-full before:-left-2',
                )}
                aria-label={item.name}
              >
                {item.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {item.name}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Documentation">
                  <Book className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Settings">
                  <Settings2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip> */}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
              <CircleUserRound className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setShowSettings(true)}
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Settings"
            >
              <Settings2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Settings
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
export default ActivityBar

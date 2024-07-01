import { Separator } from '@renderer/shadcn/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/shadcn/ui/tabs'
import { Input } from '@renderer/shadcn/ui/input'
import { cn } from '@renderer/lib/utils'
import { Button } from '@renderer/shadcn/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/shadcn/ui/tooltip'
import {
  Bird,
  Book,
  ToyBrick,
  Blocks,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  Layers,
  CircleUserRound,
  Triangle,
  Turtle
} from 'lucide-react'
import { useDeckPad } from '@renderer/hooks/useDeckPad'

const ActivityBar = () => {
    const {
      setShowSettings,
      setShowExtensions,
    } = useDeckPad()
  return (
    <aside className="flex h-full flex-col border-r">
      {/* <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </div> */}
      <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg bg-muted" aria-label="Pages">
              <Layers className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Pages
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Actions">
              <ToyBrick className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Actions
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setShowExtensions(true)}
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Extensions"
            >
              <Blocks className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Extensions
          </TooltipContent>
        </Tooltip>
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

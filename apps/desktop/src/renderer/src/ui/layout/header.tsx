import { useState } from 'react'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'

import { Button } from '@renderer/shadcn/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/shadcn/ui/card'
import { Checkbox } from '@renderer/shadcn/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/shadcn/ui/dropdown-menu'
import { Input } from '@renderer/shadcn/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@renderer/shadcn/ui/sheet'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { QRCodeModal } from '@renderer/components/modals'
import { Status } from '../Status'

export const Header = () => {
  const {
    newBoard,
    loadBoard,
    saveBoard,
    saveBoardAs,
    setShowSettings,
    setShowExtensions,
    serverStatus,
    serverIP,
    serverStartStop,
    companionName
  } = useDeckPad()
  const [showQrCode, setShowQrCode] = useState<boolean>(false)
  const closeQrCode = () => setShowQrCode(false)

  const serverStartStopText = serverStatus ? 'STOP' : 'START'
  const serverStartStopIcon = serverStatus ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
      />
    </svg>
  )

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background p-4 md:px-6">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* <Button className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Button> */}
        <Button
          onClick={() => serverStartStop()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <>
            {serverStartStopIcon}
            {serverStartStopText}
          </>
        </Button>
        <Button
          onClick={() => setShowQrCode(true)}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          QRCODE
        </Button>
        <QRCodeModal showQrCode={showQrCode} closeQrCode={closeQrCode} />
        <Button
          onClick={() => newBoard()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          New
        </Button>
        <Button
          onClick={() => loadBoard()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Open..
        </Button>
        <Button
          onClick={() => saveBoard()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Save
        </Button>
        <Button
          onClick={() => saveBoardAs()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Save As..
        </Button>
      </nav>
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Button className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Button>
            <Button
              onClick={() => newBoard()}
              className="text-muted-foreground hover:text-foreground"
            >
              New
            </Button>
            <Button
              onClick={() => loadBoard()}
              className="text-muted-foreground hover:text-foreground"
            >
              Open..
            </Button>
            <Button
              onClick={() => saveBoard()}
              className="text-muted-foreground hover:text-foreground"
            >
              Save
            </Button>
            <Button
              onClick={() => saveBoardAs()}
              className="text-muted-foreground hover:text-foreground"
            >
              Save As..
            </Button>
          </nav>
        </SheetContent>
      </Sheet> */}
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4 ml-auto">
        <Status status={!!companionName}>
          {!!companionName ? <div>CONNECTED TO: {companionName}</div> : <div>NOT CONNECTED</div>}
        </Status>
        {/* <div className="flex gap-4">
          <Status status={true}>LAN</Status>
          <Status status={false}>BLUETOOTH</Status>
        </div> */}
        <div className="flex gap-4">
          <Status status={serverStatus}>STATUS</Status>
        </div>
        {/* <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  )
}

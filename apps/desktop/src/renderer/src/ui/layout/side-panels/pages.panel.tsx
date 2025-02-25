import { Bird, Rabbit, Trash2, Turtle } from 'lucide-react'
import { Button } from '@renderer/shadcn/ui/button'
import SideBarPanel from '../side-bar.panel'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { cn } from '@renderer/lib/utils'
import { Label } from '@renderer/shadcn/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/shadcn/ui/select'
import { Input } from '@renderer/shadcn/ui/input'
import { Textarea } from '@renderer/shadcn/ui/textarea'

const PagesPanel = () => {
  const {
    board,
    actual,
    setActual,
    addPage,
    deletePage,
    maxCol,
    maxRow,
    updateCol,
    updateRow,
    updateActualDeck
  } = useDeckPad()
  return (
    <>
      <SideBarPanel title={'PAGES'}>
        {board.map((page, index) => (
          <Button
            key={index}
            onClick={() => setActual(index)}
            variant="ghost"
            size="lg"
            className={cn('w-full justify-start rounded-none', index === actual && 'bg-primary/20')}
          >
            {/* {index == actual ? '🔘 ' + page.name : '⚫ ' + page.name} */}
            <p className="truncate">{page.name}</p>
          </Button>
          // <h1 className="text-white text-lg cursor-pointer" onClick={() => setActual(index)}>
          //   {index == actual ? '🔘 ' + page.name : '⚫ ' + page.name}
          // </h1>
        ))}
        <Button
          onClick={() => addPage()}
          variant="ghost"
          size="lg"
          className="w-full justify-start rounded-none px-2"
        >
          <h4 className="truncate font-semibold">+ ADD PAGE</h4>
          {/* {'+ ADD PAGE'} */}
        </Button>
      </SideBarPanel>
      <SideBarPanel title={'PAGE CONFIGURATION'}>
        <div className="relative hidden flex-col items-start gap-8 md:flex">
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 p-4">
              {/* <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend> */}
              <div className="grid gap-3">
                <Label htmlFor="page-name">Page Name</Label>
                <Input
                  id="page-name"
                  type="text"
                  placeholder="Page Name"
                  value={board[actual].name || ''}
                  onChange={(e) => updateActualDeck({ ...board[actual], name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="page-col">Page Columns</Label>
                  <Input
                    id="page-col"
                    type="number"
                    value={board[actual].col}
                    onChange={(e) => {
                      const colValue = Number(e.target.value)
                      updateCol(colValue >= maxCol ? maxCol : colValue < 0 ? 0 : colValue)
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="page-row">Page Rows</Label>
                  <Input
                    id="page-row"
                    type="number"
                    value={board[actual].row}
                    onChange={(e) => {
                      const rowValue = Number(e.target.value)
                      updateRow(rowValue >= maxRow ? maxRow : rowValue < 0 ? 0 : rowValue)
                    }}
                  />
                </div>
              </div>
              <Button variant="destructive" onClick={() => deletePage()}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Page
              </Button>
            </fieldset>
          </form>
        </div>
      </SideBarPanel>
    </>
  )
}
export default PagesPanel

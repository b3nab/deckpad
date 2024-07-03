import { Button } from '@renderer/shadcn/ui/button'
import SideBarPanel from '../side-bar.panel'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { cn } from '@renderer/lib/utils'

const PagesPanel = () => {
  const {
    board,
    actual,
    setActual,
    addPage
  } = useDeckPad()
  return (
    <SideBarPanel title={'PAGES'}>
      {board.map((page, index) => (
        <Button
          key={index}
          onClick={() => setActual(index)}
          variant="ghost"
          size="lg"
          className={cn(
            "w-full justify-start rounded-none",
            index === actual && "bg-primary/20"
          )}
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
        <h4 className='truncate font-semibold'>+ ADD PAGE</h4>
        {/* {'+ ADD PAGE'} */}
      </Button>
    </SideBarPanel>
  )
}
export default PagesPanel
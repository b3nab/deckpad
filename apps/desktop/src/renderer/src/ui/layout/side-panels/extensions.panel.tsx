import { useDeckPad } from '@renderer/hooks/useDeckPad'
import SideBarPanel from '../side-bar.panel'
import CollapsibleButton from '@renderer/ui/collapsible-button'
import { Button } from '@renderer/shadcn/ui/button'

const ExtensionsPanel = () => {
    const { plugins } = useDeckPad()
  return (
    <SideBarPanel title="EXTENSIONS">
      {Object.keys(plugins).map((plugin) => (
        <CollapsibleButton key={plugin} title={plugin}>
          {Object.keys(plugins[plugin]).map((action, i) => (
            <Button variant="ghost" size="sm" className="w-full justify-start rounded-none">
              <p className="truncate text-sm pl-6 pr-2">{action}</p>
            </Button>
          ))}
        </CollapsibleButton>
      ))}
    </SideBarPanel>
  )
}
export default ExtensionsPanel
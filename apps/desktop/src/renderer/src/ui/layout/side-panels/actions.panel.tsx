import { useDeckPad } from '@renderer/hooks/useDeckPad'
import SideBarPanel from '../side-bar.panel'
import CollapsibleButton from '@renderer/ui/collapsible-button'
import { Button } from '@renderer/shadcn/ui/button'

const ActionsPanel = () => {
  const { plugins } = useDeckPad()
  // console.log('[SIDE] plugins are => ', plugins)
  return (
    <SideBarPanel title="ACTIONS">
      {Object.keys(plugins).map((plugin) => (
        <CollapsibleButton key={plugin} title={plugin}>
          {Object.keys(plugins[plugin]).map((action, i) => (
            <Button
              key={`${plugin}-${action}-${i}`}
              variant="ghost"
              size="sm"
              className="w-full justify-start rounded-none"
            >
              <p className="truncate text-sm pl-6 pr-2">{action}</p>
            </Button>
          ))}
        </CollapsibleButton>
      ))}
    </SideBarPanel>
  )
}
export default ActionsPanel
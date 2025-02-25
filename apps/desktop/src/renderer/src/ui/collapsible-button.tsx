import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@renderer/shadcn/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@renderer/shadcn/ui/collapsible'

interface CollapsibleButtonProps {
  title: string
  children: React.ReactElement | React.ReactElement[] | React.ReactNode
}

export const CollapsibleButton = ({
  title,
  children
 }: CollapsibleButtonProps) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start rounded-none">
          {isOpen ? <ChevronDown /> : <ChevronRight />}
          <p className="truncate text-sm">{title}</p>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="">{children}</CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleButton

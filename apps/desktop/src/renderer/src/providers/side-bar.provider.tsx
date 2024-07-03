import { createContext, useContext, useReducer, useRef } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'

export enum SIDE_ACTION {
  OPEN = 'OPEN_SIDEBAR',
  CLOSE = 'CLOSE_SIDEBAR',
  SET_PANEL = 'SET_PANEL'
}

interface SideBarAction {
  type: SIDE_ACTION | string
  panel?: string
  payload?: any
}

export type SideBarActionType = SideBarAction

interface SideBarState {
  isOpen: boolean
  panel: string | null | undefined

}

interface SideBarContextType {
  state: SideBarState
  dispatch: React.Dispatch<SideBarAction>
  ref: React.RefObject<ImperativePanelHandle> | null
}

export const SideBarContext = createContext<SideBarContextType>({
  state: {
    isOpen: false,
    panel: null
  },
  dispatch: () => {},
  ref: null
})

const sideBarReducer =
  (refSidePanel: React.RefObject<ImperativePanelHandle>) =>
  (state: SideBarState, action: SideBarAction): SideBarState => {
    switch (action.type) {
      case 'OPEN_SIDEBAR':
        refSidePanel.current?.expand()
        return { ...state, isOpen: true }
        case 'CLOSE_SIDEBAR':
        refSidePanel.current?.collapse()
        return { ...state, isOpen: false }
      case 'SET_PANEL':
        return { ...state, panel: action.panel }
      // INTERNALLY USED
      case 'PRIVATE_SET_IS_OPEN':
        return { ...state, isOpen: action.payload }
      default:
        return state
    }
  }

export const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
  const refSidePanel = useRef<ImperativePanelHandle>(null)
  const [stateSideBar, dispatch] = useReducer(sideBarReducer(refSidePanel), {
    isOpen: refSidePanel.current?.isExpanded() || false,
    panel: 'pages'
  })
  return (
    <SideBarContext.Provider value={{ state: stateSideBar, dispatch, ref: refSidePanel }}>
      {children}
    </SideBarContext.Provider>
  )
}

export const useSideBar = () => {
  const ctxSideBar = useContext(SideBarContext)
  if (!ctxSideBar) {
    throw new Error('useSideBar must be used within a SideBarProvider')
  }
  return ctxSideBar
}

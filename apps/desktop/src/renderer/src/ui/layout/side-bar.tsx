import { Fragment, useState } from 'react'
import clsx from 'clsx'
import QRCode from 'react-qr-code'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { Btn } from '@renderer/ui'
import SideBarPanel from './side-bar.panel'
import { Button } from '@renderer/shadcn/ui/button'
import CollapsibleButton from '../collapsible-button'
import { ResizablePanelGroup } from '@renderer/shadcn/ui/resizable'
import { useSideBar } from '@renderer/providers/side-bar.provider'
import PagesPanel from './side-panels/pages.panel'
import ActionsPanel from './side-panels/actions.panel'
import ExtensionsPanel from './side-panels/extensions.panel'

export const SideBar = () => {
  const { state: stateSideBar } = useSideBar()
  const panels = {
    pages: <PagesPanel />,
    actions: <ActionsPanel />,
    extensions: <ExtensionsPanel />
  }

  return (
    <div className="relative flex flex-col h-full">
      <ResizablePanelGroup
        className="w-full"
        direction="vertical"
      >
        {
          panels[stateSideBar.panel || 'default']
        }
      </ResizablePanelGroup>
    </div>
  )

  // return (
  //   <Grid className={clsx(classes.flex, classes.rootSide)}>
  //     {/* <Grid>
  //         <Paper>
  //           <Grid container direction={"column"} spacing={2}>
  //           <TextField
  //             id="page-name"
  //             label="Name"
  //             type="text"
  //             // InputLabelProps={{
  //             //   shrink: true,
  //             // }}
  //             value={board[actual].name || ''}
  //             onChange={(e) => updateActualDeck({...board[actual], name: e.target.value})}
  //             // variant="filled"
  //           />

  //           <TextField
  //             style={{maxWidth: 100}}
  //             id="page-col"
  //             label="Columns"
  //             type="number"
  //             InputLabelProps={{
  //               shrink: true,
  //             }}
  //             value={board[actual].col}
  //             onChange={(e) => updateCol(e.target.value >= maxCol ? maxCol : (e.target.value < 0 ? 0 : e.target.value))}
  //             variant="filled"
  //           />
  //           <TextField
  //             style={{maxWidth: 100}}
  //             id="page-row"
  //             label="Rows"
  //             type="number"
  //             InputLabelProps={{
  //               shrink: true,
  //             }}
  //             value={board[actual].row}
  //             onChange={(e) => updateRow(e.target.value >= maxRow ? maxRow : (e.target.value < 0 ? 0 : e.target.value))}
  //             variant="filled"
  //           />

  //           <Button onClick={() => deletePage()}>
  //             <DeleteIcon />
  //           </Button>
  //           </Grid>
  //         </Paper>
  //       </Grid> */}
  //   </Grid>
  // )
}

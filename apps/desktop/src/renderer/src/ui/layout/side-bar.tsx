import { Fragment, useState } from 'react'
import clsx from 'clsx'
import QRCode from 'react-qr-code'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { Btn } from '@renderer/ui'
import SideBarPanel from './side-bar.panel'
import { Button } from '@renderer/shadcn/ui/button'
import CollapsibleButton from '../collapsible-button'
import { ResizableHandle, ResizablePanelGroup } from '@renderer/shadcn/ui/resizable'

export const SideBar = () => {
  const {
    board,
    actual,
    setActual,
    plugins,
    addPage,
    deletePage,
    maxCol,
    maxRow,
    updateCol,
    updateRow,
    updateActualDeck
  } = useDeckPad()

  console.log('[SIDE] plugins are => ', plugins)

  return (
    <div className="relative flex flex-col h-full">
      <ResizablePanelGroup
        className="w-full"
        direction="vertical"
        // onLayout={(sizes: number[]) => {
        //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        // }}
      >
        {/* PAGES */}
        <SideBarPanel title={'PAGES'}>
          {board.map((page, index) => (
            <Button
              onClick={() => setActual(index)}
              variant="ghost"
              size="lg"
              className="w-full justify-start rounded-none"
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
        {/* ACTIONS */}
        <SideBarPanel title="ACTIONS">
          {Object.keys(plugins).map((plugin) => (
            <CollapsibleButton title={plugin}>
              {Object.keys(plugins[plugin]).map((action, i) => (
                <Button variant="ghost" size="sm" className="w-full justify-start rounded-none">
                  <p className="truncate text-sm pl-6 pr-2">{action}</p>
                </Button>
              ))}
            </CollapsibleButton>
          ))}
        </SideBarPanel>
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

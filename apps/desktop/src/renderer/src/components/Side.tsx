import { Fragment, useState } from 'react'
import clsx from 'clsx'
import QRCode from 'react-qr-code'
import { useDeckPad } from '@renderer/lib/useDeckPad'

export const Side = () => {
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
  const [tabIndex, setTabIndex] = useState('1')

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  console.log('[SIDE] plugins are => ', plugins)

  return (
    <div className="flex flex-col ml-4 gap-4">
      {/* PAGES */}
      <div className="flex flex-col p-6 bg-boxBack rounded-2xl">
        <h1 className="text-2xl text-white text-center">{'PAGES'}</h1>
        <ul className="p-4">
          {board.map((page, index) => (
            <h1 className="text-white text-lg cursor-pointer" onClick={() => setActual(index)}>
              {page.name}
            </h1>
          ))}
          <h1 className="text-white text-lg cursor-pointer" onClick={() => addPage()}>
            {'+ ADD PAGE'}
          </h1>
        </ul>
      </div>
      {/* PLUGINS */}
      <div className="flex flex-col p-6 bg-boxBack rounded-2xl overflow-scroll">
        <h1 className="text-2xl text-white text-center">{'PLUGINS'}</h1>
        <ul className="p-4">
          {Object.keys(plugins).map((plugin) => (
            <>
              <h1 className="text-white text-lg cursor-pointer" onClick={() => setActual(index)}>
                {plugin}
              </h1>
              {Object.keys(plugins[plugin]).map((action, i) => (
                <p className="text-white">{`  - ${action}`}</p>
              ))}
            </>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <Grid className={clsx(classes.flex, classes.rootSide)}>
      {/* <Grid>
          <Paper>
            <Grid container direction={"column"} spacing={2}>
            <TextField
              id="page-name"
              label="Name"
              type="text"
              // InputLabelProps={{
              //   shrink: true,
              // }}
              value={board[actual].name || ''}
              onChange={(e) => updateActualDeck({...board[actual], name: e.target.value})}
              // variant="filled"
            />

            <TextField
              style={{maxWidth: 100}}
              id="page-col"
              label="Columns"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={board[actual].col}
              onChange={(e) => updateCol(e.target.value >= maxCol ? maxCol : (e.target.value < 0 ? 0 : e.target.value))}
              variant="filled"
            />
            <TextField
              style={{maxWidth: 100}}
              id="page-row"
              label="Rows"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={board[actual].row}
              onChange={(e) => updateRow(e.target.value >= maxRow ? maxRow : (e.target.value < 0 ? 0 : e.target.value))}
              variant="filled"
            />

            <Button onClick={() => deletePage()}>
              <DeleteIcon />
            </Button>
            </Grid>
          </Paper>
        </Grid> */}
    </Grid>
  )
}

import electron from 'electron'
import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core'

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

export const Extensions = ({ showExtensions, plugins, close }) => {
  const [ inputted, setInputTo ] = useState()
  const [ extensionsDir, setExtsDir ] = useState()
  const [ installed, setInstalled ] = useState([])
  useEffect(() => {
    console.log('input changed to => ', inputted)
    if(ipc) {
      (async () => {
        const extensionsDir = await ipc.invoke('extensions.get-dir')
        setExtsDir(extensionsDir)
        console.log('Extension Directory is => ', extensionsDir)
      })()
    }
  })

  const install = async () => {
    ipc.on(`epm-installed-${inputted}`, (event, err, pluginPath) => {
      console.log('Installed package at position: ', pluginPath)
      setInstalled([...installed, inputted])
    });
    ipc.send('epm-install', extensionsDir, inputted, 'latest')
    // const res = ipc.invoke('extensions.install', inputted)
    // console.log('Install res => ', res)
  }

  const doWith = (p) => {
    return async () => {
      ipc.invoke('extensions.use', p)
    }
  }

  return (
    <Dialog fullWidth open={showExtensions} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Extensions</DialogTitle>
      {plugins ? (
        <DialogContent>
          <input type="text" onChange={(e) => setInputTo(e.target.value)} />
          <button onClick={() => install()}>INSTALL</button>
          <List>
            {[...installed,
              ...Object.keys(plugins)
            ].map((pluginName, index) => (
              <ListItem key={index}>
                {/* onClick={() => setActual(index)}> */}
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={pluginName} onClick={doWith(pluginName)} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      ) : (
        <DialogContent>
          <LinearProgress />
        </DialogContent>
      )}
    </Dialog>
  )
}

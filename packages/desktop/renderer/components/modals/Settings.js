import electron from 'electron'
import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  // LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core'

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

export const Settings = ({ showSettings, close }) => {
  const [ configs, setConfigs ] = useState()
  
  useEffect(() => {
    if(ipc) {
      ipc.on('configs-installed', (event, data) => { 
        // console.log(`configs-installed are: ${JSON.stringify(data, null, 2)}`)
        console.log(`configs-installed are: ${Object.keys(data)}`)
        setConfigs(data)
      })
      ipc.send('configs-installed')
    }
    return () => {
      if(ipc) {
        ipc.removeAllListeners('configs-installed')
      }
    }
  }, [showSettings])

  return (
    <Dialog fullWidth open={showSettings} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Settings</DialogTitle>
      {configs ? (
        <List>
          {Object.keys(configs).map((pluginName, index) => (
            <ListItem key={index}>
               {/* onClick={() => setActual(index)}> */}
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={pluginName} />
            </ListItem>
          ))}
        </List>
      ) : (
        <DialogContent>
          {/* <LinearProgress /> */}
        </DialogContent>
      )}
    </Dialog>
  )
}

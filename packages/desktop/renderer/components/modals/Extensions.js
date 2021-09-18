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
  // useEffect(() => {
  //   if(ipc) {
  //     ipc.send('plugins-installed')
  //   }
  // }, [showExtensions])

  return (
    <Dialog fullWidth open={showExtensions} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Installed Extensions</DialogTitle>
      {plugins ? (
        <DialogContent>
          <List>
            {Object.keys(plugins).map((pluginName, index) => (
              <ListItem key={index}>
                {/* onClick={() => setActual(index)}> */}
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={pluginName} />
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

import React from 'react'
import {
  Grid,
  AppBar,
  Button,
} from '@material-ui/core'
import clsx from 'clsx'
import { useStyles } from '../lib/useStyles'

export const DeckBar = ({ newBoard, loadBoard, saveBoard, saveBoardAs, openSettings, openExtensions }) => {
  const classes = useStyles()
  return (
    <AppBar position="sticky" color="transparent" elevation={0} className={classes.appBar}>
      <Grid container spacing={0} className={classes.toolbar} style={{alignItems: 'flex-start'}}>
        <Grid item>
          <Button className={classes.marginRight} variant="contained" color="primary" size="small" onClick={() => newBoard()}>NEW</Button>
          <Button className={classes.marginRight} variant="contained" color="primary" size="small" onClick={() => loadBoard()}>LOAD</Button>
          <Button className={classes.marginRight} variant="contained" color="primary" size="small" onClick={() => saveBoard()}>SAVE</Button>
          <Button className={classes.marginRight} variant="contained" color="primary" size="small" onClick={() => saveBoardAs()}>SAVE AS..</Button>
          {/* <Button className={classes.marginRight} variant="contained" color="primary" size="small" onClick={() => openSettings()}>SETTINGS</Button> */}
          {/* <Button className={classes.marginRight} variant="contained" color="primary" size="small" onClick={() => openExtensions()}>EXTENSIONS</Button> */}
        </Grid>
      </Grid>
    </AppBar>
    )
  }
  
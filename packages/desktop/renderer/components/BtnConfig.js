import electron from 'electron'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { 
  Select,
  TextField,
} from 'formik-material-ui'
import {
  Grid,
  Button,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Box,
} from '@material-ui/core'
import {
  ToggleButton,
} from '@material-ui/lab'
import { 
  ToggleButtonGroup,
} from 'formik-material-ui-lab'
import {
  RadioButtonUnchecked as CircleIcon,
  CheckBoxOutlineBlank as SquareIcon,
  Block as NoneIcon
} from '@material-ui/icons'
import {
  ColorField,
  ImageField,
} from './fields'
import { DeckBtn } from './DeckBtn'
import { useStyles } from '../lib/useStyles'

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

export const BtnConfig = ({ show, close, btn, saveBtn, plugins }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.DeckPaper}>
      {btn ? (
        <Formik enableReinitialize
          initialValues={btn.settings}
          onSubmit={(values, {setSubmitting}) => {
            // console.info(JSON.stringify(values, null, 2))
            saveBtn(values)
            setSubmitting(false)
            // close()
          }}
        >
          {({ submitForm, isSubmitting, values, resetForm }) => (
          <Form>
            <Box p={1}>

              <Grid item>
                Button Preview
              </Grid>

              <Box display="flex" p={2} flexGrow="1">
                <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                  <Grid container item alignItems="start" justifyContent="start">
                    <Grid container item direction="column" alignItems="center" justifyContent="start">
                      <DeckBtn {...values} clickAction={() => { if(ipc) { ipc.send('open-image') } }} />
                      <Field component={ImageField}
                        name="image"
                        type="text"
                        label="Image"
                      />
                      {/* <Typography as="h6">Shape</Typography> */}
                      <Field component={ToggleButtonGroup}
                        id="shape"
                        name="shape"
                        type="checkbox"
                        label="Shape"
                        exclusive
                      >
                        <ToggleButton value="circle" aria-label="circle">
                          <CircleIcon />
                        </ToggleButton>
                        <ToggleButton value="square" aria-label="square">
                          <SquareIcon />
                        </ToggleButton>
                        <ToggleButton value="none" aria-label="none">
                          <NoneIcon />
                        </ToggleButton>
                      </Field>
                    </Grid>
                    <Grid container item direction="column" justifyContent="start">
                      {/* <Typography as="h6">Text</Typography> */}
                      {/* <Typography as="h6">Colors</Typography> */}
                      <Field component={ColorField}
                        name="bgColor"
                        type="text"
                        label="Background Color"
                      />
                      <Field component={ColorField}
                        name="labelColor"
                        type="text"
                        label="Text Color"
                      />
                    </Grid>
                  </Grid>
                  <Field component={TextField}
                    name="label"
                    type="text"
                    label="Label"
                    autoFocus
                    fullWidth
                  />
                </Box>


                <Box display="flex" p={2} flexDirection="column" flexGrow="1" justifyContent="flex-start">
                  {plugins && (
                    <>
                      <FormControl>
                        <InputLabel htmlFor="action.plugin">Plugin</InputLabel>
                        <Field
                          component={Select}
                          name="action.plugin"
                          inputProps={{
                            id: 'action.plugin',
                          }}
                        >
                          {Object.keys(plugins).map((plugin, i) => (
                            <MenuItem key={i} value={plugin}>{plugin.toUpperCase()}</MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                      {values.action.plugin && Object.keys(plugins[values.action.plugin]) && (
                        <>
                          <FormControl>
                            <InputLabel htmlFor="action.type">Action</InputLabel>
                            <Field
                              component={Select}
                              name="action.type"
                              inputProps={{
                                id: 'action.type',
                              }}
                            >
                              {Object.keys(plugins[values.action.plugin]).map((action, i) => (
                                <MenuItem key={i} value={action}>
                                  {plugins[values.action.plugin][action].label}
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>
                          {values.action.type && plugins[values.action.plugin][values.action.type] && plugins[values.action.plugin][values.action.type].options && (
                            <FormControl>
                              <InputLabel htmlFor="action.options">Options</InputLabel>
                              <Field
                                component={Select}
                                name="action.options"
                                inputProps={{
                                  id: 'action.options',
                                }}
                              >
                                {plugins[values.action.plugin][values.action.type].options.map((option, i) => (
                                    <MenuItem key={i} value={option.value}>
                                      {option.name}
                                    </MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                          )}
                        </>
                      )}
                    </>
                  )}


                </Box>

              </Box>

              {isSubmitting && <LinearProgress />}
              <Grid container justifyContent="flex-end">
                  <Button onClick={resetForm} color="secondary">
                    RESET
                  </Button>
                  <Button type="submit" disabled={isSubmitting} color="primary">
                    SAVE
                  </Button>
              </Grid>
            </Box>
          </Form>
          )}
        </Formik>
      ) : (
        <DialogContent>
          <DialogContentText>
            Click a Button to start editing
          </DialogContentText>
        </DialogContent>
      )}
    </Paper>
  )
}

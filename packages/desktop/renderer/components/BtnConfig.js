import electron from 'electron'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { 
  Checkbox,
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
  ListSubheader,
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
  PathField,
} from './fields'
import { DeckBtn } from './DeckBtn'
import { useStyles } from '../lib/useStyles'

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

export const BtnConfig = ({ show, close, btn, saveBtn, plugins }) => {
  const classes = useStyles()
  
  const missingPluginOrAction = (values) => {
    // console.log(`missingPluginOrAction - values:`, values)
    // console.log('"plugin=>action" input value is there ? ', values.action.plugin)
    const [plugin, action] = values?.action?.plugin?.split('=>') || [null, null]
    // const [plugin, action] = values?.action?.plugin
    let pluginMissing = false
    let actionMissing = false
    if(!!values?.action?.plugin && !!plugin && !!action) {
      pluginMissing = !Object.keys(plugins).includes(plugin)
      actionMissing = !Object.keys(plugins[plugin]).includes(action)
    }
    // console.log('pluginMissing ? ', pluginMissing)
    // console.log('actionMissing ? ', actionMissing)
    // console.log('action input value is there ? ', !!action)
    // if(!pluginMissing && !!values?.action?.type) {
    // }
    return pluginMissing || actionMissing
  }
  

  const buildActionInputs = (pluginAction) => {
    const [plugin, action] = pluginAction.split('=>')
    const inputs = plugins[plugin][action].inputs


    const buildInput = v => {
      switch (v.type) {
        case 'text':
        case 'textearea':
        case 'number':
        case 'url':
        case 'email':
        case 'password':
          return wrapInput(TextField, v.key, null, {type: v.type, label: v.label, multiline: v.type==='textarea'})
        case 'checkbox':
          return wrapInput(Checkbox, v.key, v.label, {type: v.type})
        case 'color':
          return wrapInput(ColorField, v.key, v.label)
        case 'select':
          const childs =  v.extra && v.extra.options ?
            v.extra.options.map((opt) =>
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ) : null
          return wrapInput(Select, v.key, v.label, null, childs)
        case 'path':
          return wrapInput(PathField, v.key, v.label)
      }
    }


    const wrapInput = (Comp, key, label, fieldExtras=null, childs=null) => (
      <FormControl>
        {label && <InputLabel htmlFor={`action.options.${key}`}>{label}</InputLabel>}
        <Field component={Comp}
          name={`action.options.${key}`}
          inputProps={{
            id: `action.options.${key}`,
          }}
          {...fieldExtras}
        >
          {childs}
        </Field>
      </FormControl>
    )

    // console.log(`inputs =>`,inputs)
    
    let actionInputs = []
    inputs && inputs.forEach(inp => {
      actionInputs.push(buildInput(inp))
    })
    
    // console.log(`outputs =>`, actionInputs)
      
    return actionInputs
  }

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
                  <Grid container item alignItems="flex-start" justifyContent="flex-start">
                    <Grid container item direction="column" alignItems="center" justifyContent="flex-start">
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
                    <Grid container item direction="column" justifyContent="flex-start">
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


                <Box display="flex" p={2} flexDirection="column" flexGrow="1" justifyContent="flex-start" style={{position: "relative"}}>
                  { missingPluginOrAction(values) ? (
                      <Box display="flex" p={2} flexDirection="column" flexGrow="1" justifyContent="flex-start" alignItems="center" style={{position: "absolute", top: 0, width: "100%"}}>
                        <Typography variant="h5">Missing plugin</Typography>
                      </Box>
                    ) : (
                      <>
                      { plugins && (
                        <FormControl>
                          <InputLabel htmlFor="action.plugin">Plugin</InputLabel>
                          <Field
                            component={Select}
                            name="action.plugin"
                            inputProps={{
                              id: 'action.plugin',
                            }}
                          >
                            {Object.entries(plugins).map(([namePlugin, plugin]) => [
                                (<ListSubheader key={namePlugin}>{namePlugin.toUpperCase()}</ListSubheader>),
                                ...Object.entries(plugin).map(([nameAction, action]) => (
                                  <MenuItem key={nameAction} value={`${namePlugin}=>${nameAction}`}>{action.label}</MenuItem>
                                ))
                            ])}
                          </Field>
                        </FormControl>
                      )}
                      { values.action.plugin &&
                        buildActionInputs(values.action.plugin)
                      }
                      </>
                    )
                  }
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

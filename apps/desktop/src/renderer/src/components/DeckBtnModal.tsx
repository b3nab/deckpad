import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { Select, TextField, ToggleButtonGroup } from 'formik-mui'
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
  MenuItem
} from '@mui/material'
import { ToggleButton } from '@mui/material'
import {
  RadioButtonUnchecked as CircleIcon,
  CheckBoxOutlineBlank as SquareIcon,
  Block as NoneIcon
} from '@mui/icons-material'
import { ColorField, ImageField } from '../ui/fields'
import { DeckBtn } from './DeckBtn'

// Preventing NextJS SSR webpacking
const ipc = window.electron.ipcRenderer || false

export const DeckBtnModal = ({ show, close, btnSettings, saveDeckBtn }) => {
  const [plugins, setPlugins] = useState()
  const shapes = [
    {
      name: 'circle',
      icon: CircleIcon
    },
    {
      name: 'square',
      icon: SquareIcon
    },
    {
      name: 'none',
      icon: NoneIcon
    }
  ]

  useEffect(() => {
    if (ipc) {
      ipc.on('plugins-list-update', (event, data) => {
        console.log(`plugins are: ${JSON.stringify(data, null, 2)}`)
        setPlugins(data)
      })
    }
    return () => {
      if (ipc) {
        ipc.removeAllListeners('plugins-list-update')
      }
    }
  }, [show])

  return (
    <Dialog fullWidth open={show} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Button</DialogTitle>
      {btnSettings ? (
        <Formik
          initialValues={btnSettings}
          onSubmit={(values, { setSubmitting }) => {
            // console.info(JSON.stringify(values, null, 2))
            saveDeckBtn(values)
            setSubmitting(false)
            close()
          }}
        >
          {({ submitForm, isSubmitting, values }) => (
            <Form>
              <DialogContent>
                <DialogContentText>Button Preview</DialogContentText>

                <Grid container direction="row">
                  <Grid item xs={4}>
                    <DeckBtn
                      {...values}
                      clickAction={() => {
                        if (ipc) {
                          ipc.send('open-image')
                        }
                      }}
                    />
                    <Field component={ImageField} name="image" type="text" label="Image" />
                    <Typography as="h6">Text</Typography>
                    <Field
                      component={TextField}
                      name="label"
                      type="text"
                      label="Label"
                      autoFocus
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <Typography as="h6">Shape</Typography>
                    <Field
                      component={ToggleButtonGroup}
                      id="shape"
                      name="shape"
                      type="checkbox"
                      label="Shape"
                      exclusive
                    >
                      {shapes.map((shape, i) => (
                        <ToggleButton key={i} value={shape.name} aria-label={shape.name}>
                          <shape.icon />
                        </ToggleButton>
                      ))}
                    </Field>
                    <Typography as="h6">Colors</Typography>
                    <Field component={ColorField} name="labelColor" type="text" label="Text" />
                    <Field component={ColorField} name="bgColor" type="text" label="Background" />
                  </Grid>
                </Grid>

                {plugins && (
                  <FormControl>
                    <InputLabel htmlFor="action.plugin">Plugin</InputLabel>
                    <Field
                      component={Select}
                      name="action.plugin"
                      inputProps={{
                        id: 'action.plugin'
                      }}
                    >
                      {Object.keys(plugins).map((plugin, i) => (
                        <MenuItem key={i} value={plugin}>
                          {plugin.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                )}

                {plugins && values.action.plugin && (
                  <FormControl>
                    <InputLabel htmlFor="action.type">Action</InputLabel>
                    <Field
                      component={Select}
                      name="action.type"
                      inputProps={{
                        id: 'action.type'
                      }}
                    >
                      {Object.keys(plugins[values.action.plugin]).map((action, i) => (
                        <MenuItem key={i} value={action}>
                          {plugins[values.action.plugin][action].label}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                )}

                {plugins && values.action.plugin && values.action.type && (
                  <FormControl>
                    <InputLabel htmlFor="action.options">Options</InputLabel>
                    <Field
                      component={Select}
                      name="action.options"
                      inputProps={{
                        id: 'action.options'
                      }}
                    >
                      {plugins[values.action.plugin][values.action.type].options.map(
                        (option, i) => (
                          <MenuItem key={i} value={option.value}>
                            {option.name}
                          </MenuItem>
                        )
                      )}
                    </Field>
                  </FormControl>
                )}

                {isSubmitting && <LinearProgress />}
              </DialogContent>
              <DialogActions>
                <Button onClick={close} color="primary">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} color="secondary">
                  SAVE
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      ) : (
        <DialogContent>
          <LinearProgress />
        </DialogContent>
      )}
    </Dialog>
  )
}

import electron from 'electron'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { 
  fieldToTextField,
  TextField,
} from 'formik-material-ui'
import {
  Button,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
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

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

export const DeckBtnModal = ({ show, close, btnSettings, saveDeckBtn }) => {
  const [ btnImage, setBtnImage ] = useState(btnSettings.image)

  return (
    <Dialog fullWidth open={show} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Button</DialogTitle>
      {btnSettings ? (
        <Formik
          initialValues={btnSettings}
          onSubmit={(values, {setSubmitting}) => {
            // console.info(JSON.stringify(values, null, 2))
            saveDeckBtn(values)
            setSubmitting(false)
            close()
          }}
        >
          {({ submitForm, isSubmitting, values }) => (
          <Form>
            <DialogContent>

              <DialogContentText>
                Button Preview
              </DialogContentText>

              <DeckBtn {...values} />

              <Field component={ImageField}
                name="image"
                type="text"
                label="Image"
              />
              <Field component={TextField}
                name="label"
                type="text"
                label="Label"
                autoFocus
                fullWidth
              />
              <Field component={ColorField}
                name="labelColor"
                type="text"
                label="Text"
              />
              <Field component={ColorField}
                name="bgColor"
                type="text"
                label="Background"
              />
              <Typography as="h6">Shape</Typography>
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

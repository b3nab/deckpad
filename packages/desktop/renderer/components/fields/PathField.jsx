import electron from 'electron'
import React, { Fragment, useEffect } from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { Button } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

export const PathField = (props) => {
  const {
    form: { setFieldValue },
    field: { name, value: valuePath },
    openFolder
  } = props

  useEffect(() => {
    if(ipc) {
      ipc.on('selected-path', (event, data) => { data[0] && setFieldValue(name, data[0]) })
    }
    return () => {
      if(ipc) {
        ipc.removeAllListeners('selected-path')
      }
    }
  }, [])

  const removePath = () => {
    setFieldValue(name, '')
  }

  return (
    <div>
      {valuePath && (
        <Fragment>
          <Field component={TextField}
            name={name}
            type="text"
            label="Label"
            autoFocus
            fullWidth
          />
          {/* <Button onClick={() => removePath()}>
            <DeleteIcon />
          </Button> */}
        </Fragment>
      )}
      {/* <p>{valuePath}</p> */}
      <Button onClick={() => {
        if(ipc) {
          ipc.send('get-path', openFolder)
        }
      }}>{!valuePath ? 'Open path' : 'Change path'}</Button>
    </div>
    )
}

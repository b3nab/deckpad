import electron from 'electron'
import React, { Fragment, useEffect } from 'react'
import { Button } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

// Preventing NextJS SSR webpacking
const ipc = electron.ipcRenderer || false

export const ImageField = (props) => {
  const {
    form: { setFieldValue },
    field: { name, value: valueImage },
  } = props

  useEffect(() => {
    if(ipc) {
      ipc.on('selected-btn-image', (event, data) => { setFieldValue(name, data) })
    }
    return () => {
      if(ipc) {
        ipc.removeAllListeners('selected-btn-image')
      }
    }
  }, [])

  const removeImage = () => {
    setFieldValue(name, '')
  }

  return (
    <div>
      {valueImage && (
        <Fragment>
          {/* <img src={valueImage} alt="btnImage" style={{width: '70px', height: '70px'}}/> */}
          <Button onClick={() => removeImage()}>
            <DeleteIcon />
          </Button>
        </Fragment>
      )}
      {/* <p>{valueImage}</p> */}
      <Button onClick={() => {
        if(ipc) {
          ipc.send('open-image')
        }
      }}>{!valueImage ? 'Open image' : 'Change image'}</Button>
    </div>
    )
}

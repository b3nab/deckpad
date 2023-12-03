import { Fragment, useEffect } from 'react'
import { Field } from 'formik'
import { Btn, TextField } from '@renderer/ui'
// import { Delete as DeleteIcon } from '@mui/icons-material'

const ipc = window.electron.ipcRenderer || false

export const PathField = (props) => {
  const {
    form: { setFieldValue },
    field: { name, value: valuePath },
    openFolder
  } = props

  useEffect(() => {
    if (ipc) {
      ipc.on('selected-path', (event, data) => {
        data[0] && setFieldValue(name, data[0])
      })
    }
    return () => {
      if (ipc) {
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
          <Field component={TextField} name={name} type="text" label="Label" autoFocus fullWidth />
          <Btn onClick={() => removePath()}>
            {/* <DeleteIcon /> */}
            <p className="text-justify">Delete Image</p>
          </Btn>
        </Fragment>
      )}
      {/* <p>{valuePath}</p> */}
      <Btn
        onClick={() => {
          if (ipc) {
            ipc.send('get-path', openFolder)
          }
        }}
      >
        {!valuePath ? 'Open path' : 'Change path'}
      </Btn>
    </div>
  )
}

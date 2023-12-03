import { Fragment, useEffect } from 'react'
import { Btn } from '@renderer/ui'

const ipc = window.electron.ipcRenderer || false

export const ImageField = (props) => {
  const {
    form: { setFieldValue },
    field: { name, value: valueImage }
  } = props

  useEffect(() => {
    if (ipc) {
      ipc.on('selected-btn-image', (event, data) => {
        setFieldValue(name, data)
      })
    }
    return () => {
      if (ipc) {
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
          <Btn onClick={() => removeImage()}>Delete Image</Btn>
        </Fragment>
      )}
      {/* <p>{valueImage}</p> */}
      <Btn
        onClick={() => {
          if (ipc) {
            ipc.send('open-image')
          }
        }}
      >
        {!valueImage ? 'Open image' : 'Change image'}
      </Btn>
    </div>
  )
}

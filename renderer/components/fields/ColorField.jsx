import React, { useCallback } from 'react'
import { fieldToTextField } from 'formik-material-ui'
import ColorPicker from 'react-input-color'
import { Typography } from '@material-ui/core'

export const ColorField = (props) => {
  const {
    form: { setFieldValue },
    field: { name, value: valueColor },
    label
  } = props
  const onChange = color => {
    // console.log('COLOR FIELD CHANGE TO => ', color)
    setFieldValue(name, color ? color.hex : 'transparent')
  }
  
  return (
    <div style={{ margin: '20px 20px 20px', textAlign: 'center' }}>
      <Typography variant="overline">{label + '  - '}</Typography>
      <ColorPicker
        initialValue={valueColor}
        onChange={onChange}
        // {...fieldToTextField(props)}
      />
    </div>
  )
}
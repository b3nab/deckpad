import React, { useState } from 'react'
import { fieldToTextField } from 'formik-material-ui'
import ColorPicker from 'react-input-color'
import { ChromePicker } from 'react-color'
import { Typography, Popover } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import styled from 'styled-components'

export const ColorField = (props) => {
  const  [displayColorPicker, setDisplayColorPicker] = useState(false)
  const {
    form: { setFieldValue },
    field: { name, value: valueColor },
    label
  } = props
  const onChange = color => {
    // const rgba = `${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a}`
    // console.log('COLOR FIELD CHANGE TO => ', rgba, color)
    setFieldValue(name, color ? color.rgb : 'transparent')
  }
  
  return (
    <div style={{ margin: '20px 20px 20px' }}>
      <Typography variant="overline" display="inline">{label + '  - '}</Typography>
      <PopupState variant="popover" popupId="color-popup">
        {(popupState) => (
          <div>
            <Swatch {...bindTrigger(popupState)}>
              <SwatchColor rgba={valueColor} />
            </Swatch>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <ChromePicker color={valueColor} onChange={onChange} />
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  )
}

const Swatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  display: inline-block;
  cursor: pointer;
`

const SwatchColor = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${props => `rgba(${props.rgba.r},${props.rgba.g},${props.rgba.b},${props.rgba.a})`};
`

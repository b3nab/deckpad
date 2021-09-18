import React, { useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import { Typography, Popover } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import styled from 'styled-components'

export const ColorField = (props) => {
  const {
    form: { setFieldValue },
    field: { name, value: valueColor },
    label
  } = props
  console.log('arrived ', valueColor)
  
  const rgba = color => {
    if(typeof color === 'object') {
      return {
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a,
      }
    } else return hexToRGB(color)
  }

  const hexToRGB = (hex, alpha=1) => {
    hex   = hex.replace('#', '')
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16)
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16)
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16)
    return {r,g,b,a:alpha}
  }

  const onChange = color => {
    // const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    // console.log('COLOR FIELD CHANGE TO => ', rgba, color)
    setFieldValue(name, color)
  }
  
  return (
    <div style={{ margin: '20px 20px 20px' }}>
      <Typography variant="overline" display="inline">{label + '  - '}</Typography>
      <PopupState variant="popover" popupId="color-popup">
        {(popupState) => (
          <div>
            <Swatch {...bindTrigger(popupState)}>
              <SwatchColor rgba={rgba(valueColor)} />
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
              <RgbaColorPicker color={valueColor} onChange={onChange} />
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

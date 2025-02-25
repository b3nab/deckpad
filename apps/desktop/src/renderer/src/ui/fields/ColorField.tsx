import { Popover } from '@headlessui/react'
import { useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import { usePopper } from 'react-popper'

export const ColorField = (props) => {
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top'
  })

  const {
    form: { setFieldValue },
    field: { name, value: valueColor },
    label
  } = props
  // console.log('arrived ', valueColor)

  const rgba = (color) => {
    if (typeof color === 'object') {
      return {
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a
      }
    } else return hexToRGB(color)
  }

  const hexToRGB = (hex, alpha = 1) => {
    hex = hex.replace('#', '')
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16)
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16)
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16)
    return { r, g, b, a: alpha }
  }

  const onChange = (color) => {
    // const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    // console.log('COLOR FIELD CHANGE TO => ', rgba, color)
    setFieldValue(name, color)
  }

  return (
    <div className="flex flex-row items-center gap-1 m-5">
      <h3 className="inline-flex">{label}</h3>
      <Popover className="relative inline-flex">
        <Popover.Button ref={setReferenceElement}>
          <Swatch>
            <SwatchColor rgba={rgba(valueColor)} />
          </Swatch>
        </Popover.Button>
        <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <div className="z-10">
            <RgbaColorPicker color={rgba(valueColor)} onChange={onChange} />
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  )
}

const Swatch = ({ children }) => {
  return <div className="inline-block p-1 cursor-pointer rounded-sm">{children}</div>
}

const SwatchColor = (props) => {
  return (
    <div
      className="w-6 h-6 rounded-sm"
      style={{
        background: `rgba(${props.rgba.r},${props.rgba.g},${props.rgba.b},${props.rgba.a})`
      }}
    ></div>
  )
}

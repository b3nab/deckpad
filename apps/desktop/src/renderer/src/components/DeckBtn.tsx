import { useRef, useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'

// const ipc = window.electron.ipcRenderer || false

const DeckBtnWrapper = (props): JSX.Element => {
  const shapeCss =
    props.shape == 'circle' ? 'rounded-full' : props.shape == 'square' ? 'rounded-xl' : 'rounded-sm'
  return (
    <div
      {...props}
      className={`w-12 h-12 relative flex flex-col justify-center items-center overflow-hidden m-4 bg-black ${shapeCss} hover:cursor-grab ${
        props.isDragging && 'cursor-grabbing'
      }`}
      style={{
        background: props.background
      }}
    >
      {props.children}
    </div>
  )
}

export const DeckBtn = ({
  deckId,
  position,
  onSwitchPosition,
  clickAction,
  fireAction,
  ...props
}) => {
  const { btnShadow, label, labelColor, shape, bgColor, image } = props
  // console.log('BTN position === ', deckId, '@', position)
  const ref = useRef(null)
  const [{ isDragging }, connectDrag] = useDrag(() => ({
    type: 'DECKBTN',
    item: { position },
    canDrag: () => true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  const [{ isOver, canDrop, item, dropRes }, connectDrop] = useDrop({
    accept: 'DECKBTN',
    canDrop: () => true,
    drop: () => {
      // console.log('wanna drop here:', position, `IAM this ${JSON.stringify(item)}`)
      onSwitchPosition({ position: item.position, target: position })
      return {
        dropped: true
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
      dropRes: monitor.getDropResult()
    })
  })

  connectDrag(ref)
  connectDrop(ref)

  const rgba = (color) =>
    typeof color == 'object' ? `rgba(${color.r},${color.g},${color.b},${color.a})` : color

  return (
    <DeckBtnWrapper
      isDragging
      shape={shape}
      background={rgba(bgColor)}
      ref={ref}
      onClick={() => clickAction()}
      onDoubleClick={() => fireAction()}
    >
      <div className={`w-12 h-12 rounded-xl flex w-full h-full justify-center items-center`}>
        <p className={`text-xs text-white text-[${rgba(labelColor)}]`}>
          {btnShadow?.label || label}
        </p>
        {image && (
          <img
            src={image}
            alt="btnImage"
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          />
        )}

        {!(image || label) && (
          <span className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </span>
        )}
      </div>
    </DeckBtnWrapper>
  )
}

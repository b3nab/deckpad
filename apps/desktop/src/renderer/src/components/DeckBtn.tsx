import { useRef, useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'

// const ipc = window.electron.ipcRenderer || false

const DeckBtnWrapper = (props): JSX.Element => (
  <div
    {...props}
    className={`w-12 h-12 relative flex flex-col justify-center items-center overflow-hidden m-4 rounded-xl bg-black
     ${props.primary ? '' : ''}`}
  >
    {props.children}
  </div>
)

// const DeckBtnWrapperOld = styled('div', {
//   name: 'DeckBtnWrapper'
// })(({ theme }) => ({
//   width: '50px',
//   height: '50px',
//   position: 'relative',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   transition: 'all 0.3s linear',
//   overflow: 'hidden',
//   margin: '15px',
//   // border: '1px solid #ffffff60',
//   borderRadius: '15px',
//   background: theme.palette.common.black,
//   boxShadow: `
//   #000000 -3px 4px 0px 1px,
//   #5c5c5c -4px 5px 0px 1px,
//   `,

//   // ${(props) =>
//   //   props.background
//   //     ? `
//   //   background: ${props.background},
//   // `
//   //     : ''}

//   // ${(props) =>
//   //   props.shape === 'circle' &&
//   //   `
//   //   // border: 3px solid ${props.background},
//   //   border-radius: 100px,
//   // `}

//   // ${(props) =>
//   //   props.shape === 'square' &&
//   //   `
//   //   // border: 3px solid ${props.background},
//   //   border-radius: 10px,
//   // `}

//   // ${(props) =>
//   //   props.shape === 'none' &&
//   //   `
//   //   border: none,
//   //   box-shadow: none,
//   // `}

//   opacity: `${(props) => (props.isDragging ? 1 : 0.5)}`

//   // &:hover {
//   //   cursor: grab,
//   // }
// }))

// const AddIcon = styled(Add)`
//   transition: all 0.4s !important;
//   opacity: 0;
//   ${DeckBtnWrapper}:hover & {
//     opacity: 1;
//   }
// `

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
        {/* <p className={`text-[${rgba(labelColor)}]`}>{btnShadow?.label || label}</p> */}
        {/* {image && (
        <img
          src={image}
          alt="btnImage"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
      )}
    */}
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

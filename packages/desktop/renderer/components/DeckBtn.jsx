import React, { useRef } from 'react'
import {
  Typography,
  Button
} from '@material-ui/core'
import { 
  Add as AddIcon,
} from '@material-ui/icons'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'

const DeckBtnWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all .3s linear;
  overflow: hidden;
  margin: .3em;
  
  ${props => props.background ? `
    background: ${props.background};
  ` : ''}

  ${props => props.shape === 'circle' && `
    // border: 3px solid ${props.background};
    border-radius: 100px;
  `}
  ${props => props.shape === 'square' && `
    // border: 3px solid ${props.background};
    border-radius: 10px;
  `}
  // ${props => props.shape === 'none' && ``}

  opacity: ${props => props.isDragging ? 1 : 0.5};

  &:hover {
    cursor: grab;
  }
`


export const DeckBtn = ({position, onSwitchPosition, showModal, ...props}) => {
  const [{ isDragging }, connectDrag] = useDrag({
    item: {position, type: 'DECKBTN'},
    canDrag: () => true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [{isOver, canDrop, item, dropRes}, connectDrop] = useDrop({
    accept: 'DECKBTN',
    canDrop: () => true,
    drop: () => {
      // console.log('wanna drop here:', position, `IAM this ${JSON.stringify(item)}`)
      onSwitchPosition({position: item.position, target: position})
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
  
  const ref = useRef(null)
  connectDrag(ref)
  connectDrop(ref)
  const { label, labelColor, shape, bgColor, image } = props

  return (
    <DeckBtnWrapper 
      isDragging
      shape={shape}
      background={bgColor}
      ref={ref}
      onClick={() => showModal()}
    >
      {/* <Button style={{width: 70, height: 70, borderRadius: 10, border: '3px solid black'}}> */}
        
        <Typography variant='caption' style={{color: labelColor, zIndex: "1"}}>{label}</Typography>
        {image && (
          <img src={image} alt="btnImage" style={{width: '70px', height: '70px', position: 'absolute'}}/>
        )}
        {!(image || label) && (
          <AddIcon color="primary" />
        )}

      {/* </Button> */}
    </DeckBtnWrapper>
  )
}
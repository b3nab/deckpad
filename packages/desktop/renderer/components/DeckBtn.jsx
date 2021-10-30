import React, { useRef, useState, useEffect } from 'react'
import electron from 'electron'
import {
  Typography,
  Button
} from '@mui/material'
import { 
  Add,
} from '@mui/icons-material'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'


const ipc = electron.ipcRenderer || false

const DeckBtnWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all .3s linear;
  overflow: hidden;
  margin: 15px;
  border: 1px solid #ffffff60;
  box-shadow: #000000 -3px 4px 0px 1px, #5c5c5c -4px 5px 0px 1px;
  
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
  ${props => props.shape === 'none' && `
    border: none;
    box-shadow: none;
  `}

  opacity: ${props => props.isDragging ? 1 : 0.5};

  &:hover {
    cursor: grab;
  }
`

const AddIcon = styled(Add)`
  transition: all .4s !important;
  opacity: 0;
  ${DeckBtnWrapper}:hover & {
    opacity: 1;
  }
`


export const DeckBtn = ({deckId, position, onSwitchPosition, clickAction, fireAction, ...props}) => {
  const { btnShadow, label, labelColor, shape, bgColor, image } = props
  // console.log('BTN position === ', deckId, '@', position)
  const ref = useRef(null)
  const [{ isDragging }, connectDrag] = useDrag(() => ({
    type: 'DECKBTN',
    item: {position},
    canDrag: () => true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }))
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
  
  connectDrag(ref)
  connectDrop(ref)

  const rgba = color => 
    typeof(color) == 'object' ? 
      `rgba(${color.r},${color.g},${color.b},${color.a})`
      : color

  return (
    <DeckBtnWrapper 
      isDragging
      shape={shape}
      background={rgba(bgColor)}
      ref={ref}
      onClick={() => clickAction()}
      onDoubleClick={() => fireAction()}
    >
      {/* <Button style={{width: 70, height: 70, borderRadius: 10, border: '3px solid black'}}> */}
        
        <Typography variant='caption' style={{color: rgba(labelColor), zIndex: "1"}}>{btnShadow?.label || label}</Typography>
        {image && (
          <img src={image} alt="btnImage" style={{width: '100%', height: '100%', position: 'absolute'}}/>
        )}
        {!(image || label) && (
          <AddIcon color="primary" />
        )}

      {/* </Button> */}
    </DeckBtnWrapper>
  )
}
import React, { Fragment } from 'react'
import { Image } from 'react-native'
import { Caption } from 'react-native-paper'
import styled from 'styled-components/native'

const DeckBtnWrapper = styled.TouchableHighlight`
  width: 70px;
  height: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 10px;
  
  ${props => props.background ? `
    background: ${props.background};
  ` : ''}

  ${props => props.shape === 'circle' && `
    border-radius: 100px;
  `}
  ${props => props.shape === 'square' && `
    border-radius: 10px;
  `}

  &:hover {
    cursor: grab;
  }
`

export const DeckBtn = ({api, position, ...props}) => {
  const { label, labelColor, shape, bgColor, image, action } = props

  const fireAction = () => {
      console.log('fire btn @position ', position)
      api.post('/action', {
          body: {
              position,
              action,
          }
      })
  }

  return (
    <DeckBtnWrapper 
      shape={shape}
      background={bgColor}
      onPress={() => fireAction()}
    >
        <Fragment>
            {image && (
            <Image source={{uri: image}} alt="btnImage" style={{width: 70, height: 70, position: 'absolute'}}/>
            )}
            <Caption style={{color: labelColor, zIndex: 1}}>{label}</Caption>
        </Fragment>
    </DeckBtnWrapper>
  )
}
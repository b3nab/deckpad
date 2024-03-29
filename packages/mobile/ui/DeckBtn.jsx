import React, { Fragment, useState, useEffect } from 'react'
// import { Image } from 'react-native'
import { impactAsync } from 'expo-haptics'
import { Caption as RNCaption } from 'react-native-paper'
import styled from 'styled-components/native'

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`
const Caption = styled(RNCaption)`
  color: ${props => props.color || '#FFFFFF'};
  z-index: 1;
`

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
  border: 1px solid #ffffff60;
  /* 
    cannot use box-shadow property on react-native
    need to find a solution for the 3d button effect
   */
  /* box-shadow: #000000 -3px 4px 0px 1px, #5c5c5c -4px 5px 0px 1px; */
  
  background: ${props => props.background || '#FFFFFF'};

  border-radius: ${props =>
    props.shape == 'circle' ? `100px` :
    props.shape == 'square' ? '10px' :
    '0'
  };  
`

export const DeckBtn = ({io, deckId, position, btnShadow, shadowBoard, changeDeck, ...props}) => {
  let { label, labelColor, shape, bgColor, image, action } = props
  const [shadowLabel, setShadowLabel] = useState(shadowBoard?.[deckId]?.buttons?.[position.row]?.[position.col]?.label)
  const parseColor = (color) => {
    if(typeof color == 'object') {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    }
    return color
  }
  labelColor = parseColor(labelColor)
  bgColor = parseColor(bgColor)
  
  useEffect(() => {
    // console.log('btnSHADOW changed!!!! => btnShadow', btnShadow)
    setShadowLabel(btnShadow?.label)
  }, [btnShadow, shadowBoard])
  
  // useEffect(() => {
  //   console.log('shadowBoard changed => shadowBoard', shadowBoard)
  // }, [shadowBoard])

  const fireAction = () => {
    const origin = {
      deck: deckId,
      pos: position
    }
    impactAsync()
    io.emit('action', {
      action,
      origin,
    })
    // console.log('fire btn @origin ', origin)
    // console.log(`action => ${JSON.stringify(action,null,2)}`)
    if(action.plugin) {
      const [plu, act] = action.plugin.split('=>')
      if(plu === 'companion') {
        if(act === 'change-deck') {
          changeDeck(action.options.toPage)
        }
      }
    }
  }

  return (
    <DeckBtnWrapper 
      shape={shape}
      background={bgColor}
      onPress={() => fireAction()}
    >
        <Fragment>
            {!!image && 
                <Image source={{uri: image}}></Image>
            }
            <Caption color={labelColor}>{shadowLabel || label}</Caption>
        </Fragment>
    </DeckBtnWrapper>
  )
}
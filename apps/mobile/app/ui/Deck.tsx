import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components'
import { DeckBtn } from './DeckBtn'
import { ActivityIndicator } from 'react-native-paper'

const BoardWrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DeckWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  display: ${props => props.visible ? 'flex' :  'none'};
`

const DeckRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Deck = ({ board, shadowBoard, actual, setActual, io, goToHome }) => {
  const changeDeck = (id) => {
    // console.log('[SWITCH-DECK] to id: ', id)
    // console.log('[SWITCH-DECK] actual index: ', actual)
    // find index from id
    const toDeck = board.findIndex(deck => deck.id === id)
    // console.log('[SWITCH-DECK] to toDeck: ', toDeck)
    const toIndex = toDeck != -1 ? toDeck : actual
    setActual(toIndex)
    io.emit('switch-deck', toIndex)
  }

  return (
    <BoardWrapper>
      {board ? 
        board.map((deck, i) => (
          <DeckWrapper key={deck.id} visible={actual == i}>
            {deck.buttons.slice(0,deck.row).map((row, r) => (
              <DeckRow key={`row-${r}`}>
                {row.slice(0,deck.col).map((btn, c) => (
                  <DeckBtn key={`btn-r${r}-c${c}`}
                    io={io}
                    deckId={deck.id}
                    // position={`${r}-${c}`}
                    position={{row: r, col: c}}
                    changeDeck={changeDeck}
                    shadowBoard={shadowBoard}
                    btnShadow={shadowBoard[deck.id]?.buttons?.[r]?.[c]}
                    {...btn}
                  />
                ))}
              </DeckRow>
            ))}
          </DeckWrapper>
        ))
      : <ActivityIndicator />
      }

    </BoardWrapper>
)}


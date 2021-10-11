import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import styled from 'styled-components'
import { DeckBtn } from './DeckBtn'
import { ActivityIndicator, FAB } from 'react-native-paper'

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

// const styles = StyleSheet.create({
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//   },
// })

export const Deck = ({ board, actual, setActual, api, goToHome }) => {
  const changeDeck = (id) => {
    // console.log('[SWITCH-DECK] to id: ', id)
    // console.log('[SWITCH-DECK] actual index: ', actual)
    // find index from id
    const toDeck = board.findIndex(deck => deck.id === id)
    // console.log('[SWITCH-DECK] to toDeck: ', toDeck)
    const toIndex = toDeck != -1 ? toDeck : actual
    setActual(toIndex)
    api.emit('switch-deck', toIndex)
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
                    api={api}
                    deckId={deck.id}
                    position={`${r}-${c}`}
                    changeDeck={changeDeck}
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


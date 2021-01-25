import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { DeckBtn } from './DeckBtn'
import Frisbee from 'frisbee'
import { ActivityIndicator, FAB } from 'react-native-paper'

const DeckWrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`

const DeckRow = styled.View`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export const Deck = ({ serverAddress, goToHome }) => {
  console.log(`[DECK] server address is ${serverAddress}`)
  const [ board, setBoard ] = useState()
  const [ actual, setActual ] = useState(0)

  const api = new Frisbee({
    baseURI: `${serverAddress}`, // optional
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const changeDeck = (id) => {
    let toIndex = 0
    // find index from id
    board.forEach((deck, i) => {
      toIndex = deck.id === id ? i : toIndex
    })
    setActual(toIndex)
  }

  async function initCompanion() {
    try {
      const companionRes = await api.get(`/companion`)
      // console.log(companionRes.body)
      setBoard(companionRes.body.board)
    } catch (error) {
      console.error('Deck.initCompanion : ', error)
      goToHome()
    }
  }

  useEffect(() => {
    initCompanion()
  }, [serverAddress])
  
  if(!board) {
    return (
      <DeckWrapper>
        <ActivityIndicator />
      </DeckWrapper>
    )
  }

  return (
    <DeckWrapper>
      <FAB
        style={styles.fab}
        small
        icon="reload"
        onPress={() => initCompanion()}
      />
      {/* <Text>Board name: {board && board[0].name}</Text> */}
      {[...Array(board[actual].row)].map((e,r) => (
        <DeckRow key={`row-${r}`}>
          {[...Array(board[actual].col)].map((e,c) => (
            <DeckBtn 
              api={api}
              key={`${r}-${c}`}
              position={`${r}-${c}`}
              changeDeck={changeDeck}
              {...board[actual].buttons[r][c]}
            />
          ))}
        </DeckRow>
      ))}
    </DeckWrapper>
)}


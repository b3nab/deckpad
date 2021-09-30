import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import * as Device from 'expo-device'
import styled from 'styled-components'
import { DeckBtn } from './DeckBtn'
import Frisbee from 'frisbee'
import io from 'socket.io-client'
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

export const Deck = ({ serverAddress, goToHome }) => {
  // console.log(`[DECK] server address is ${serverAddress}`)
  const [ board, setBoard ] = useState()
  const [ actual, setActual ] = useState(0)
  const [api, setAPI] = useState()

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

  // async function initCompanion() {
  //   try {
  //     const companionAPI = new Frisbee({
  //       baseURI: `${serverAddress}`, // optional
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     const companionRes = await companionAPI.get(`/companion`)
  //     console.log(companionRes.body)
  //     setBoard(companionRes.body.board)
  //     setAPI(companionAPI)
  //   } catch (error) {
  //     console.error('Deck.initCompanion : ', error)
  //     goToHome()
  //   }
  // }
  async function initCompanion() {
    try {
      console.log(`[DECK] server address is ${serverAddress}`)
      console.log('[DECK] initCompanion()')
      const socket = io(serverAddress)
      setAPI(socket)
      
      console.log('[IO] build listeners')
      socket.on('connect', () => {
        console.log('[IO] connected to socket server! Device is: ', Device.deviceName)
        socket.emit('companion', Device.deviceName)
      });

      socket.on('disconnect', () => {
        console.log('[IO] DeckPad disconnected')
        goToHome()
        setAPI()
        setBoard()
      });
      
      socket.on('board', (boardObject) => {
        console.log(`[IO] update board `,{boardObject})
        setBoard(boardObject)
      });
    } catch (error) {
      console.error('Deck.initCompanion : ', error)
      goToHome()
    }
  }

  useEffect(() => {
    // if(serverAddress) {
    initCompanion()
    // }
  }, [])
  
  return (
    <BoardWrapper>
      {/* <FAB
        style={styles.fab}
        small
        icon="reload"
        onPress={() => initCompanion()}
      /> */}

      {board ? 
        // <Text key={`btn-r${r}-c${c}`}>[BTN!]</Text>
        board.map((deck, i) => (
          <DeckWrapper key={deck.id} visible={actual == i}>
            {deck.buttons.slice(0,deck.row).map((row, r) => (
              <DeckRow key={`row-${r}`}>
                {row.slice(0,deck.col).map((btn, c) => (
                  <DeckBtn key={`btn-r${r}-c${c}`}
                    api={api}
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


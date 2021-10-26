import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { DeckBtn } from './DeckBtn'
import { DeckBtnModal } from './DeckBtnModal'
import { useStyles } from '../lib/useStyles'
import electron from 'electron'
import pubsub from 'electron-pubsub'
const ipc = electron.ipcRenderer || false


const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DeckWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  display: ${props => props.visible ? 'flex' :  'none'};
`

const DeckRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Deck = ({ board, actual, updateDeck, openBtnConfig, sendIPC }) => {
  // console.log('[UI|Deck] board actual is => ', board)
  const classes = useStyles()
  const [ shadowBoard, setShadowBoard ] = useState({})
  // deepmerge(partial, target)
  // partial is the partial or path payload
  // target is the full object (in time it's the previous object)
  const deepmerge = (partial, target) => {
    let final = {...target}
    for (const [key, val] of Object.entries(partial)) {
      if (val !== null && typeof val === `object`) {
        if (final[key] === undefined) {
          final[key] = new val.__proto__.constructor()
        }
        final[key] = deepmerge(val, final[key])
      } else {
        if (final[key] === undefined) {
          final[key] = new val.__proto__.constructor()
        }
        final[key] = val
      }
    }
    return final
  }
  const updateShadowBoard = (partialShadow) => {
    const newShadow = deepmerge(partialShadow, shadowBoard)
    setShadowBoard({...newShadow})
  }
   useEffect(() => {
    if(ipc) {
      ipc.on('update-label', (event, shadowLabel) => {
        // console.log('update label!', shadowLabel)
        updateShadowBoard(shadowLabel)
      })
    }
    return () => {
      ipc.removeAllListeners('update-label')
    }
  })

  const matrixSwitchAB = (matrix, a,b) => {
    const elA = matrix[a.row][a.col]
    const elB = matrix[b.row][b.col]
    matrix[a.row][a.col] = elB
    matrix[b.row][b.col] = elA
    return matrix
  }
  const objSwitchAB = (obj, a,b) => {
    let newObj = {
      [a.row]: {[a.col]: {}},
      [b.row]: {[b.col]: {}}
    }
    newObj[a.row][a.col] = obj[b.row]?.[b.col] || null
    newObj[b.row][b.col] = obj[a.row]?.[a.col] || null
    return newObj
  }

  const switchPosition = ({position, target}) => {
    // console.log('Switch Position => ', position, ' to ', target)
    let newDeck = {...board[actual]}
    newDeck.buttons = matrixSwitchAB(newDeck.buttons, position, target)
    console.log(newDeck)
    updateDeck(newDeck)
    const actualId = board[actual].id
    let newShad = {...shadowBoard[actualId]}
    newShad.buttons = objSwitchAB(newShad.buttons, position, target)
    updateShadowBoard({[actualId]: newShad})
    // const positionItem = board[actual].buttons[position.row][position.col]
    // const targetItem = board[actual].buttons[target.row][target.col]
    // newDeck.buttons[target.row][target.col] = positionItem
    // newDeck.buttons[position.row][position.col] = targetItem
  }

  const fireAction = ({action, origin}) => {
    console.log('FIRE ACTION FROM CONFIGURATOR!')
    console.log('action', action)
    console.log('origin', origin)
    if(!action.plugin || !action.options) return
    sendIPC('fire-plugin', {action, origin})
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
                    {...btn}
                    btnShadow={shadowBoard[deck.id]?.buttons?.[r]?.[c]}
                    deckId={deck.id}
                    // position={`${r}-${c}`}
                    position={{row: r, col: c}}
                    onSwitchPosition={switchPosition}
                    clickAction={() => openBtnConfig({ settings: btn, row: r, col: c })}
                    fireAction={() => fireAction({action: btn.action, origin: {deck: deck.id, pos: {row: r, col: c}}})}
                  />
                ))}
              </DeckRow>
            ))}
          </DeckWrapper>
        ))
      :
      <div>Loading...</div>
    }

    </BoardWrapper>
  )
}
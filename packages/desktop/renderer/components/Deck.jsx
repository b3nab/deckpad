import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { DeckBtn } from './DeckBtn'
import { DeckBtnModal } from './DeckBtnModal'
import { useStyles } from '../lib/useStyles'
import electron from 'electron'
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

export const Deck = ({ board, actual, updateDeck, openBtnConfig }) => {
  // console.log('[UI|Deck] board actual is => ', board)
  const classes = useStyles()
  const [ shadowBoard, setShadowBoard ] = useState({})
  // deepmerge(source, target)
  // source is the partial or path payload
  // target is the full object (in time it's the previous object)
  const deepmerge = (source, target) => {
    let final = target
    for (const [key, val] of Object.entries(source)) {
      if (val !== null && typeof val === `object`) {
        if (target[key] === undefined) {
          final[key] = new val.__proto__.constructor()
        }
        final[key] = deepmerge(val, target[key])
      } else {
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

  const switchPosition = ({position, target}) => {
    // console.log('Switch Position => ', position, ' to ', target)
    const positionItem = board[actual].buttons[position.row][position.col]
    const targetItem = board[actual].buttons[target.row][target.col]
    let newDeck = {...board[actual]}
    newDeck.buttons[target.row][target.col] = positionItem
    newDeck.buttons[position.row][position.col] = targetItem
    updateDeck(newDeck)
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
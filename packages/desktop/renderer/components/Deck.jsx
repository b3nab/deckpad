import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { DeckBtn } from './DeckBtn'
import { DeckBtnModal } from './DeckBtnModal'
import { useStyles } from '../lib/useStyles'


const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DeckWrapper = styled.div`
  /* width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap; */
  width: 100%;
  height: 100%;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  display: ${props => props.visible ? 'flex' :  'none'};
`

const DeckRow = styled.div`
  /* display: flex;
  // flex: 1 1 100%;
  justify-content: center;
  align-items: center; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Deck = ({ board, actual, updateDeck, openBtnConfig }) => {
  const classes = useStyles()
  const deck = board[actual]
  // console.log('[UI|Deck] board actual is => ', board)
  // const { items, moveItem } = useContext(DeckContext)
  // const [ btnSettings, setBtnSettings] = useState({settings: {}})
  // const [ showDeckBtnModal, setShowDeckBtnModal] = useState(false)

  const switchPosition = ({position, target}) => {
    // console.log('Switch Position => ', position, ' to ', target)
    const [ positionRow, positionCol ] = position.split('-')
    const [ targetRow, targetCol ] = target.split('-')
    const positionItem = board[actual].buttons[positionRow][positionCol]
    const targetItem = board[actual].buttons[targetRow][targetCol]
    let newDeck = {...board[actual]}
    newDeck.buttons[targetRow][targetCol] = positionItem
    newDeck.buttons[positionRow][positionCol] = targetItem
    updateDeck(newDeck)
  }

  // const openModalDeckBtn = (btnProps, row, col) => {
  //   setBtnSettings({
  //     settings: btnProps,
  //     row,
  //     col
  //   })
  //   setShowDeckBtnModal(true)
  // }

  // const onSaveDeckBtn = (btnProps) => {
  //   console.log('btn to save: ', btnProps)
  //   setBtnSettings({settings: {}})
  //   setShowDeckBtnModal(false)
  //   let newDeck = deck
  //   newDeck.buttons[btnSettings.row][btnSettings.col] = btnProps
  //   updateDeck(newDeck)
  // }

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
                    deckId={deck.id}
                    position={`${r}-${c}`}
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

  return (
    <Paper className={classes.DeckPaper}>
      {!!deck ?
        [...Array(deck.row)].map((e,r) => (
          <DeckRow key={`row-${r}`}>
            {[...Array(deck.col)].map((e,c) => (
              <DeckBtn key={`${r}-${c}`}
                {...deck.buttons[r][c]}
                deckId={deck.id}
                position={`${r}-${c}`}
                onSwitchPosition={switchPosition}
                clickAction={() => openBtnConfig({ settings: deck.buttons[r][c], row: r, col: c })}
              />
            ))}
          </DeckRow>
        ))
        :
        <div>Loading...</div>
      }
      {/* <DeckBtnModal
        show={showDeckBtnModal}
        close={() => setShowDeckBtnModal(false)}
        btnSettings={btnSettings.settings}
        saveDeckBtn={btnProps => onSaveDeckBtn(btnProps)}
      /> */}
    </Paper>
  )
}
import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { DeckBtn } from './DeckBtn'
import { DeckBtnModal } from './DeckBtnModal'
import { useStyles } from '../lib/useStyles'

const DeckWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
`

const DeckRow = styled.div`
  display: flex;
  // flex: 1 1 100%;
  justify-content: center;
  align-items: center;
`

export const Deck = ({ deck, updateDeck, openBtnConfig }) => {
  const classes = useStyles()
  // console.log('[UI|Deck] deck actual is => ', deck)
  // const { items, moveItem } = useContext(DeckContext)
  // const [ btnSettings, setBtnSettings] = useState({settings: {}})
  // const [ showDeckBtnModal, setShowDeckBtnModal] = useState(false)

  const switchPosition = ({position, target}) => {
    // console.log('Switch Position => ', position, ' to ', target)
    const [ positionRow, positionCol ] = position.split('-')
    const [ targetRow, targetCol ] = target.split('-')
    const positionItem = deck.buttons[positionRow][positionCol]
    const targetItem = deck.buttons[targetRow][targetCol]
    let newDeck = {...deck}
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
    <Paper className={classes.DeckPaper}>
      {!!deck ?
        [...Array(deck.row)].map((e,r) => (
          <DeckRow key={`row-${r}`}>
            {[...Array(deck.col)].map((e,c) => (
              <DeckBtn key={`${r}-${c}`}
                {...deck.buttons[r][c]}
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
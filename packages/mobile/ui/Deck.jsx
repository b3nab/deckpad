import React from 'react'
import { Text, View } from 'react-native'
import { DeckBtn } from 'DeckBtn'


const DeckWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
`

const DeckRow = styled.div`
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
  align-items: center;
`

export const Deck = ({ params }) => {
    
    return (
        <DeckWrapper>
        {[...Array(deck.row)].map((e,r) => (
            <DeckRow key={`row-${r}`}>
            {[...Array(deck.col)].map((e,c) => (
                <DeckBtn 
                    key={`${r}-${c}`}
                    {...deck.buttons[r][c]}
                    position={`${r}-${c}`}
                    onSwitchPosition={switchPosition}
                    showModal={() => openModalDeckBtn(deck.buttons[r][c], r, c)}
                />
            ))}
            </DeckRow>
        ))}
        </DeckWrapper>
)}


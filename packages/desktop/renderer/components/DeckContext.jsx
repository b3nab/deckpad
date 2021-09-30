import React, { Component, createContext, useState } from "react"

// ----------------
// Helper functions
// ----------------

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
  return array
}

function moveElement(array, index, offset) {
  const newIndex = index + offset

  return move(array, index, newIndex)
}
// --------------
// DeckPad Context
// --------------

const DeckContext = createContext({ items: [] })

export const DeckProvider = (props) => {
  const [deckState, setState] = useState({
    items: [],
    // moveItem: moveItem,
    // setItems: setItems
  })

  const setItems = items => setState({ items })

  const moveItem = (sourceId, destinationId) => {
    const sourceIndex = sourceId
    const destinationIndex = destinationId
    // const sourceIndex = deckState.items.findIndex(
    //   item => item.id === sourceId
    // )
    // const destinationIndex = deckState.items.findIndex(
    //   item => item.id === destinationId
    // )

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return
    }

    const offset = destinationIndex - sourceIndex

    setState(state => ({
      items: moveElement(state.items, sourceIndex, offset)
    }))
  }

  return (
    <DeckContext.Provider value={{ deckState, moveItem, setItems }}>
      {props.children}
    </DeckContext.Provider>
  )

}

export default DeckContext
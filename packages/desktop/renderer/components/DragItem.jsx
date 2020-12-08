import React, { memo, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"

const DragItem = memo(({ id, onMoveItem, children }) => {
  const ref = useRef(null)

  const [{ isDragging }, connectDrag] = useDrag({
    item: { id, type: "DECKBTN" },
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })

  const [, connectDrop] = useDrop({
    accept: "DECKBTN",
    drop(onThis) {
      if (onThis.id !== id) {
        onMoveItem(onThis.id, id)
      }
    }
    // hover(hoveredOverItem) {
    //   if (hoveredOverItem.id !== id) {
    //     onMoveItem(hoveredOverItem.id, id)
    //   }
    // }
  })

  connectDrag(ref)
  connectDrop(ref)

  const opacity = isDragging ? 0.5 : 1
  const containerStyle = { opacity }

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      forwardedRef: ref,
      style: containerStyle
    })
  )
})

export default DragItem

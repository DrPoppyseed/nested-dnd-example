import type { State } from '@/types'
import produce from 'immer'
import { useState } from 'react'
import type { DropResult } from 'react-beautiful-dnd'

// The useDraggable hook keeps the dnd table state and an onDragEnd event handler
// that handles the state under the hood, only exposing 'state' and 'onDragEnd' hook.
const useDraggable = (initialState: State) => {
  const [state, setState] = useState(initialState)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    // If the destination is not given, don't update
    if (!destination) return

    // If the item is dropped to the same area as it started, don't update
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    // If the columns are dragged, update the columns, and vice versa.
    type === 'column'
      ? setState((prevState) =>
          produce(prevState, (draft) => {
            draft.columnOrder.splice(source.index, 1)
            draft.columnOrder.splice(destination.index, 0, draggableId)
          })
        )
      : setState((prevState) =>
          produce(prevState, (draft) => {
            const start = prevState.columns[source.droppableId]
            const finish = prevState.columns[destination.droppableId]
            const desId = start === finish ? start.id : finish.id

            draft.columns[start.id].taskIds.splice(source.index, 1)
            draft.columns[desId].taskIds.splice(
              destination.index,
              0,
              draggableId
            )
          })
        )
  }

  return { state, onDragEnd }
}

export default useDraggable

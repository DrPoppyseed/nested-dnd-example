import Column from '@/components/Column'
import initialState from '@/data/initialState'
import useDraggable from '@/hooks/useDraggable'
import { styled } from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const DndContainer = () => {
  const { state, onDragEnd } = useDraggable(initialState)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={'all-columns'}
        direction={'horizontal'}
        type={'column'}
      >
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((columnId: string, index: number) => {
              const column = state.columns[columnId]
              const tasks = column.taskIds.map(
                (taskId: string) => state.tasks[taskId]
              )

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              )
            })}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  margin: theme.spacing(1),
}))

export default DndContainer

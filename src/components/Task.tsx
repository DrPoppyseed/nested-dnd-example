import type { Task as TaskType } from '@/types'
import { Card, styled, Typography } from '@mui/material'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface TaskProps {
  task: TaskType
  index: number
}

const Task: FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          variant={'outlined'}
        >
          <Typography>{task.content}</Typography>
        </Container>
      )}
    </Draggable>
  )
}

const Container = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
}))

export default Task

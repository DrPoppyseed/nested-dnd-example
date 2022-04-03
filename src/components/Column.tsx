import Task from '@/components/Task'
import type { Column as ColumnType, Task as TaskType } from '@/types'
import { Paper, styled, Typography } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

interface TasksProps {
  tasks: TaskType[]
}

const Tasks: FC<TasksProps> = ({ tasks }) => {
  const memoedTasks = useMemo(
    () =>
      tasks.map((task, index) => (
        <Task key={task.id} index={index} task={task} />
      )),
    [tasks]
  )

  return <>{memoedTasks}</>
}

interface ColumnProps {
  column: ColumnType
  tasks: TaskType[]
  index: number
}

const Column: FC<ColumnProps> = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant={'outlined'}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type={'task'}>
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                <Tasks tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

const Container = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  width: 300,
  display: 'flex',
  flexDirection: 'column',
}))

const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const TaskList = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  flexGrow: 1,
  minHeight: 100,
}))

export default Column

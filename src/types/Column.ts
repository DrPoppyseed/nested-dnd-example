import { Task } from './Task'

export type Column = {
  id: string
  title: string
  taskIds: Task['id'][]
}

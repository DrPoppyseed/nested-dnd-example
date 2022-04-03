import { Column } from './Column'
import { Task } from './Task'

export interface State {
  tasks: {
    [key: string]: Task
  }
  columns: {
    [key: string]: Column
  }
  columnOrder: Column['id'][]
}

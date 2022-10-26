import { model, Schema } from 'mongoose'
import ITask from '../interfaces/task.interfaces'

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  location: { type: String, required: true },
  progress: { type: String, required: true },
  isDone: { type: Boolean, required: false },
  assignedTo: { type: String, required: true },
  username: { type: String, required: true },
  assignedAt: { type: String, required: true },
  compleatedAt: { type: String, required: false },
})

export const Task = model<ITask>('Task', taskSchema)

import express from 'express'
import {
  assigneTask,
  completeTask,
  deleteTask,
  editTask,
  getAllTasks,
  getUserTasks,
  getCompletedTasks,
} from '../controllers/task.controller'
import { authRoute, adminRoute } from '../middleware/auth.middleware'
export const taskRouter = express.Router()

//Assigne / Create taks
taskRouter.post('/', adminRoute, assigneTask)
//Update task to: succes / fail
taskRouter.patch('/:taskId', authRoute, completeTask)
//GET all task
taskRouter.get('/', authRoute, getAllTasks)
//GET completed tasks
taskRouter.get('/completed-tasks', authRoute, getCompletedTasks)
//GET tasks for user
taskRouter.get('/get-user-tasks', authRoute, getUserTasks)
//DELETE task
taskRouter.delete('/:taskId', adminRoute, deleteTask)
//UPDATE task
taskRouter.put('/:taskId', adminRoute, editTask)

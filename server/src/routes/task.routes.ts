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
export const taskRouter = express.Router()

//Assigne / Create taks
taskRouter.post('/', assigneTask)
//Update task to: succes / fail
taskRouter.patch('/:taskId', completeTask)
//GET all task
taskRouter.get('/', getAllTasks)
//GET completed tasks
taskRouter.get('/completed-tasks', getCompletedTasks)
//GET tasks for user
taskRouter.get('/get-user-tasks', getUserTasks)
//DELETE task
taskRouter.delete('/:taskId', deleteTask)
//UPDATE task
taskRouter.put('/:taskId', editTask)

import { Request, Response } from 'express'
import ITask from '../interfaces/task.interfaces'
import { ISelectedUser } from '../interfaces/user.interfaces'
import { Task } from '../models/task.model'
import { User } from '../models/user.model'

//@service  POST
//@route    /api/task
//@desc     assignes task to user
const assigneTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      assignedTo,
      username,
      assignedAt,
      location,
    }: ITask = req.body

    if (!title || !assignedTo || !assignedAt || !location || !username)
      return res.status(400).json({ message: 'First add requred fields' })

    //Find assignedTo user and relate task to user
    //Add select to client size with all users in company
    const selectedUser: ISelectedUser | null = await User.findOne({
      _id: assignedTo,
    })

    if (!selectedUser)
      return res.status(404).json({ message: 'User not found' })

    if (selectedUser.userType === 'korisnik')
      return res.status(400).json({ message: 'End user can not take tasks' })

    const newTask = new Task({
      title,
      description: description ? description : '',
      location,
      progress: 'awaiting',
      isDone: false,
      assignedTo: selectedUser._id,
      username,
      assignedAt,
      compleatedAt: 'Not compleated',
    })

    newTask.save()
    if (newTask)
      return res
        .status(201)
        .json({ message: 'Task successfuly assigned', task: newTask })
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  PATHCH
//@route    /api/task/:taskId
//@desc     changes isDone entity
const compleatedTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params

    if (!taskId) return res.status(400).json({ message: 'Task ID requred' })

    const selectedTask = await Task.findOne({ _id: taskId })

    if (!selectedTask)
      return res.status(404).json({ message: 'Task not found' })

    console.log(selectedTask)

    // await Task.findOneAndUpdate({ _id: taskId }, updatedTask)

    res.status(200).json({ message: 'Task successfuly updated' })
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  GET
//@route    /api/task
//@desc     returns ALL tasks
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allTasks = await Task.find()
    return res.status(200).json(allTasks)
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  GET
//@route    /api/task/:userId
//@desc     returns users tasks
const getUserTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    if (!userId) return res.status(400).json({ message: 'User ID required' })

    const usersTasks = await Task.find({ assignedTo: userId })
    res.status(200).send(usersTasks)
  } catch (error) {
    res.status(500).json(error)
  }
}

//@service  GET
//@route    /api/task/:userId
//@desc     returns users tasks
const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    if (!taskId) return res.status(400).json({ message: 'Task ID requred' })

    const selectedTask = await Task.findOne({ _id: taskId })

    if (!selectedTask)
      return res.status(404).json({ message: 'Task not found' })

    await Task.findOneAndDelete({ _id: taskId })
    return res.status(200).json({ message: 'Task successfuly deleted' })
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  GET
//@route    /api/task/:userId
//@desc     returns users tasks
const editTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params

    const { title, description, location, assignedTo }: ITask = req.body

    if (!title || !description || !location || !assignedTo)
      return res.status(400).json({ message: 'Fields required' })

    if (!taskId) return res.status(400).json({ message: 'Task ID requred' })

    const selectedTask = await Task.findOne({ _id: taskId })

    if (!selectedTask)
      return res.status(404).json({ message: 'Task not found' })

    const updatedTask = {
      title,
      description,
      location,
      assignedTo,
    }

    await Task.findOneAndUpdate({ _id: taskId }, updatedTask)

    res.status(200).json({ message: 'Task successfuly updated' })
  } catch (error) {
    res.status(500).send(error)
  }
}

export {
  assigneTask,
  compleatedTask,
  getAllTasks,
  getUserTasks,
  deleteTask,
  editTask,
}

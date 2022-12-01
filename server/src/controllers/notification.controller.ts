import { Request, Response } from 'express'
import { Notification } from '../models/notification.model'
import jwt_decode from 'jwt-decode'
import { User } from '../models/user.model'

//@service  POST
//@route    /notivications
//@desc     CREATE notification
const createNotification = async (req: Request, res: Response) => {
  try {
    const { taskCreated, userId } = req.body

    if (!userId) return res.status(400).json({ message: 'User ID required' })

    const userName = await User.findOne({ _id: userId })

    const adminUser = await User.findOne({ email: 'bejsikpejsik@gmail.com' })

    if (!adminUser)
      return res.status(400).json({ message: 'Cant get admin user' })

    if (!userName) return res.status(400).json({ message: 'User not found' })

    const newNotification = new Notification({
      title: taskCreated ? 'New task!' : 'Task completed',
      description: taskCreated ? 'View new tasks' : 'View completed task',
      assignedTo: taskCreated ? userId : adminUser._id,
      userName,
    })
    console.log(newNotification)
    newNotification.save()
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  GET
//@route    /notivications
//@desc     GET notifications
const getUserNotification = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers['authorization']

    if (!accessToken) return res.sendStatus(403)

    const decoded: { email: string; _id: string } = jwt_decode(accessToken)
    if (!decoded._id)
      return res.status(400).json({ message: 'User ID required' })

    const allNotifications = await Notification.find({
      assignedTo: decoded._id,
    })
    if (!allNotifications) return res.sendStatus(404)

    res.status(200).send(allNotifications)
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  DELETE
//@route    /notivications
//@desc     DELETE all notifications
const deleteAllNotifications = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers['authorization']

    if (!accessToken) return res.sendStatus(403)

    const decoded: { email: string; _id: string } = jwt_decode(accessToken)

    if (!decoded._id)
      return res.status(400).json({ message: 'User ID required' })
    console.log(decoded)
    await Notification.deleteMany({ assignedTo: decoded._id })
    res.status(204).json({ message: 'Notificatons deleted' })
  } catch (error) {
    console.log('Error in delete all notifications')
    res.status(500).send(error)
  }
}

//@service  DELETE
//@route    /notivications/:notificationId
//@desc     DELETE all notifications
const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params

    await Notification.findOneAndDelete({ _id: notificationId })

    res.status(204).json({ message: 'Notificaton deleted' })
  } catch (error) {
    res.status(500).send(error)
  }
}

export {
  createNotification,
  getUserNotification,
  deleteAllNotifications,
  deleteNotification,
}

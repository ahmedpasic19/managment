import { Request, Response } from 'express'
import { Notification } from '../models/notification.model'
import jwt_decode from 'jwt-decode'

//@service  POST
//@route    /notivications
//@desc     CREATE notification
const createNotification = async (req: Request, res: Response) => {
  try {
    const { taskCreated } = req.body
    const { userId } = req.params

    if (!!taskCreated) return res.status(400).json({ message: 'field requred' })

    if (!userId) return res.status(400).json({ message: 'User ID required' })

    const newNotification = new Notification({
      title: taskCreated ? 'New task!' : 'Task completed',
      description: taskCreated ? 'View new tasks' : 'View completed task',
      assignedTo: userId,
    })

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

    const allNotifications = Notification.find({ assignedTo: decoded._id })

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

    Notification.findByIdAndDelete({ assignedTo: decoded._id })

    res.status(204).json({ message: 'Notificatons deleted' })
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  DELETE
//@route    /notivications/:notificationId
//@desc     DELETE all notifications
const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params

    Notification.findOneAndDelete({ _id: notificationId })

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

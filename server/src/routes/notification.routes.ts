import express from 'express'
export const notificationRouter = express.Router()
import {
  createNotification,
  deleteAllNotifications,
  deleteNotification,
  getUserNotification,
} from '../controllers/notification.controller'

//Create notification
notificationRouter.post('/', createNotification)
//GET user notifications
notificationRouter.get('/', getUserNotification)
//DELETE all notifications
notificationRouter.delete('/', deleteAllNotifications)
//DELETE notification
notificationRouter.delete('/:notificationId', deleteNotification)

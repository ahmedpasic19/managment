import { model, Schema } from 'mongoose'

interface INotification {
  title: string
  description: string
  assignedTo: string
}

const notificationSchema = new Schema<INotification>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  assignedTo: { type: String, required: false },
})

export const Notification = model<INotification>(
  'Notification',
  notificationSchema
)

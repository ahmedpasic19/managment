import mongoose, { model, Schema } from 'mongoose'
import IUser from '../interfaces/user.interfaces'

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  accessToken: { type: String, required: false },
  refreshToken: { type: String, required: false },
})

export const User = model<IUser>('User', userSchema)

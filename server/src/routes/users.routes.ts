import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  loginUser,
} from '../controllers/users.controller'
import { adminRoute } from '../middleware/auth.middleware'
const userRouter = express.Router()

//POST User
userRouter.post('/', createUser)
//DELETE User
userRouter.delete('/:userId', adminRoute, deleteUser)
//UPDATE User
userRouter.put('/:userId', adminRoute, updateUser)
//GET all Users
userRouter.get('/', adminRoute, getAllUsers)
//Login
userRouter.post('/login', loginUser)

export default userRouter

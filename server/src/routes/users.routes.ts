import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  loginUser,
} from '../controllers/users.controller'
import { privateRoute } from '../middleware/auth.middleware'
const userRouter = express.Router()

//POST User
userRouter.post('/', createUser)
//DELETE User
userRouter.delete('/:userId', privateRoute, deleteUser)
//UPDATE User
userRouter.put('/:userId', privateRoute, updateUser)
//GET all Users
userRouter.get('/', privateRoute, getAllUsers)
//Login
userRouter.post('/login', loginUser)

export default userRouter

import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  loginUser,
} from '../controllers/users.controller'
const userRouter = express.Router()

//POST User
userRouter.post('/', createUser)
//DELETE User
userRouter.delete('/:userId', deleteUser)
//UPDATE User
userRouter.put('/:userId', updateUser)
//GET all Users
userRouter.get('/', getAllUsers)
//Login
userRouter.post('/login', loginUser)

export default userRouter

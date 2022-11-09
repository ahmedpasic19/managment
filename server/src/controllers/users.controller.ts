import { Request, Response } from 'express'
import IUser from '../interfaces/user.interfaces'
import { User } from '../models/user.model'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

//@service  POST
//@route    /user
//@desc     CREATE user
const createUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      userType,
    }: IUser = req.body

    //Validation for all inputed fields
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !userType ||
      !phoneNumber
    ) {
      return res.status(400).json({ mesasge: 'All fields requred' })
    }

    //Password must containt 8 characters
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must contain 8 ASCI characters' })
    }

    const duplicateEmail = await User.findOne({ email: email })

    if (duplicateEmail) {
      return res
        .status(400)
        .json({ message: 'User with that email alrady exists!' })
    }

    bcrypt.hash(password, 10, (error: any, hash: string) => {
      if (error) {
        return res.send(400).json({ message: 'Connection error' })
      } else {
        const newUser = new User({
          email,
          firstName,
          lastName,
          password: hash,
          userType,
          phoneNumber,
        })
        newUser.save()
        return res
          .status(201)
          .json({ message: 'User successfuly created', user: newUser })
      }
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

//@service  GET
//@route    /user
//@desc     GET all usrs
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find()

    if (allUsers) {
      res.status(200).send(allUsers)
    } else {
      res.status(404).json({ message: 'No users found' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  DELETE
//@route    /user/:userId
//@desc     DELETE user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    if (!userId) return res.status(400).json({ message: 'User ID requred' })

    const selectedUser = await User.findOneAndDelete({ _id: userId })

    if (!selectedUser)
      return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User successfuly deleted' })
  } catch (error) {
    res.status(500).send(error)
  }
}

//@service  PUT
//@route    /user/:userId
//@desc     UPDATE user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password, phoneNumber }: IUser =
      req.body

    const { userId } = req.params

    if (!userId) return res.status(400).json({ message: 'User ID requred' })

    if (!email || !firstName || !lastName || !password || !phoneNumber)
      return res.status(400).json({ message: 'All fields requred ' })

    const selectedUser = await User.findOne({ _id: userId })

    if (!selectedUser)
      return res.status(404).json({ message: 'User not found' })

    const compare = await bcrypt.compare(password, selectedUser.password)

    if (compare) {
      const updatedUser = {
        email,
        firstName,
        lastName,
        password: selectedUser.password,
        phoneNumber,
      }

      await User.findOneAndUpdate({ email }, updatedUser)
      res
        .status(200)
        .json({ message: 'User successfuly updated', user: updatedUser })
    } else {
      bcrypt.hash(password, 10, async (error: any, hash: string) => {
        if (error) {
          res.status(500).send(error)
        } else {
          const updatedUser = {
            email,
            firstName,
            lastName,
            password: hash,
            phoneNumber,
          }
          await User.findOneAndUpdate({ email }, updatedUser)
          res.status(200).json({
            message: 'User successfuly updated with new password',
            user: updatedUser,
          })
        }
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Email & password required' })

    const requestedUser = await User.findOne({ email })

    if (!requestedUser)
      return res.status(404).json({ message: 'Incorrect credentials' })

    const compare = await bcrypt.compare(password, requestedUser.password)

    if (!compare)
      return res.status(403).json({ message: 'Incorrect credentials' })

    if (compare) {
      const accessSecret = process.env.ACCES_TOKEN_SECRET || ''
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET || ''

      const accessToken = jwt.sign({ email: email }, accessSecret, {
        expiresIn: '15s',
      })
      const refreshToken = jwt.sign({ email: email }, refreshSecret, {
        expiresIn: '1y',
      })

      return res
        .status(200)
        .cookie('jwt', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 10000,
        })
        .json({
          message: 'Successfuly loged in',
          accessToken: accessToken,
        })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

export { createUser, getAllUsers, deleteUser, updateUser, loginUser }

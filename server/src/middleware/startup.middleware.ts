import { User } from '../models/user.model'
import { NextFunction, Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

const createUserOnStart = async () => {
  const existingUser = await User.findOne({ email: 'bejsikpejsik@gmail.com' })

  if (existingUser) return
  bcrypt.hash('11111111', 10, (error: any, hash: string) => {
    if (error) {
      return
    } else {
      const newUser = new User({
        email: 'bejsikpejsik@gmail.com',
        firstName: 'bejsik',
        lastName: 'pejsik',
        password: hash,
        userType: 'admin',
        phoneNumber: '123123123',
        accessToken: '',
        refreshToken: '',
      })
      newUser.save()
      return
    }
  })
}

export { createUserOnStart }

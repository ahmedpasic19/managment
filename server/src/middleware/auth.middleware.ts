import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { User } from '../models/user.model'
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

export const authRoute = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers['authorization']

  if (accessToken) {
    const accessSecret = process.env.ACCES_TOKEN_SECRET || ''

    jwt.verify(
      accessToken.split(' ')[1],
      accessSecret,
      async (err: any, decoded: any) => {
        if (err) {
          return res.sendStatus(403)
        }
        if (!decoded._id) return res.sendStatus(403)
        const user = await User.findOne({ _id: decoded._id })
        if (!user) return res.sendStatus(403)
        next()
      }
    )
  } else {
    return res.sendStatus(403)
  }
}

export const adminRoute = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers['authorization']

  if (accessToken) {
    const accessSecret = process.env.ACCES_TOKEN_SECRET || ''

    jwt.verify(
      accessToken.split(' ')[1],
      accessSecret,
      async (err: any, decoded: any) => {
        if (err) {
          return res.sendStatus(403)
        }
        if (!decoded._id) return res.sendStatus(403)

        const user = await User.findOne({ _id: decoded._id })

        if (!user) return res.sendStatus(403)

        if (user?.userType !== 'admin')
          return res.send(403).json({ message: 'Admin access only' })

        if (!user) return res.sendStatus(403)
        next()
      }
    )
  } else {
    return res.sendStatus(403)
  }
}

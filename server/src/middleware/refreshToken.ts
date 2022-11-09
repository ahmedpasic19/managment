import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { User } from '../models/user.model'
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt

    const refreshSecret = process.env.REFRESH_TOKEN_SECRET || ''
    const accessSecret = process.env.ACCES_TOKEN_SECRET || ''

    jwt.verify(refreshToken, refreshSecret, async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Expiered token' })
      }
      if (typeof decoded === 'object') {
        const user = await User.findOne({ email: decoded?.email })

        if (!user) return res.sendStatus(403)

        const newAccessToken = jwt.sign(
          { email: user?.email, _id: user?._id },
          accessSecret,
          { expiresIn: '15s' }
        )
        res.status(200).json({ accessToken: newAccessToken })
        next()
      }
    })
  } else {
    return res.status(403).json({ message: 'Forbidden' })
  }
}

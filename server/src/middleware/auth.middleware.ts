import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { User } from '../models/user.model'
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers['authorization']
  console.log('Access token before validation : ', accessToken)
  // if (accessToken instanceof Array) return
  if (accessToken) {
    const accessSecret = process.env.ACCES_TOKEN_SECRET || ''
    console.log(accessToken.split(' '[1]))
    jwt.verify(
      accessToken.split(' ')[1],
      accessSecret,
      (err: any, decoded: any) => {
        if (err) {
          console.log('Error: ', err)
          return res.sendStatus(403)
        }
        //If not expiered run next()
        next()
      }
    )
  } else {
    return res.sendStatus(403)
  }
}

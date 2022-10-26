import { Request, Response } from 'express'
import { User } from '../models/user.model'

const handleLogout = async (req: Request, res: Response) => {
  //On logout delete client-side accessToken

  const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(204)

  const refreshToken = cookies?.jwt

  const foundUser = await User.findOne({ refreshToken: refreshToken })

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    return res.sendStatus(204)
  }

  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    { refreshToken: '' }
  )

  res.clearCookie('jwt', { httpOnly: true })
  res.sendStatus(204)
}

export default handleLogout

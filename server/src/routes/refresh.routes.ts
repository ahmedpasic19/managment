import express from 'express'
import { refreshToken } from '../middleware/refreshToken'

export const refreshRouter = express.Router()

refreshRouter.get('/', refreshToken)

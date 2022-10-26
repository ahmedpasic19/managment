import express from 'express'
import handleLogout from '../controllers/logout.controller'
const logoutRoute = express.Router()

logoutRoute.get('/', handleLogout)

export default logoutRoute

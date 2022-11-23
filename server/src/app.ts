import express from 'express'
import * as dotenv from 'dotenv'
import * as path from 'path'
import connectDB from './config/db'
import userRouter from './routes/users.routes'
import logoutRoute from './routes/logout.routes'
import { refreshRouter } from './routes/refresh.routes'
import { taskRouter } from './routes/task.routes'
import { options } from './config/corsOptions'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createUserOnStart } from './middleware/startup.middleware'
import { notificationRouter } from './routes/notification.routes'
import { authRoute } from './middleware/auth.middleware'

const app = express()
const PORT = 4001

dotenv.config({ path: path.join(__dirname, '..', '.env') })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors(options))

connectDB()

//Create admin on server start
createUserOnStart()

//Routes
app.use('/api/user', userRouter)
app.use('/api/logout', logoutRoute)
app.use('/api/refresh', refreshRouter)
app.use('/api/task', taskRouter)
app.use('/api/notifications', authRoute, notificationRouter)

app.listen(PORT, () =>
  console.log('Running on port: ', PORT, 'Process id: ', process.pid)
)

import cors from 'cors'

const allowedOrigins = ['http://localhost:3000', '*']

export const options: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
}

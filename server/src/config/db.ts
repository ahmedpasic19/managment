import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const url = process.env.DATABASE_URL || ''
    const conn = await mongoose.connect(url)

    console.log('MongoDB connected: ' + conn.connection.host)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB

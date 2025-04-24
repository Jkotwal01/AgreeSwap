import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import seedRoutes from './routes/seeds.js'
import userRoutes from './routes/users.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/seeds', seedRoutes)
app.use('/api/users', userRoutes)

// Error handling middleware - add this after routes
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
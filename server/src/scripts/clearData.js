import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Seed from '../models/Seed.js'

dotenv.config()

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing seeds
    await Seed.deleteMany({})
    console.log('All seed data cleared successfully')

    process.exit(0)
  } catch (error) {
    console.error('Error clearing data:', error)
    process.exit(1)
  }
}

clearDatabase()
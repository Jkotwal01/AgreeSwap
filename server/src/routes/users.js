import express from 'express'
import { auth } from '../middleware/auth.js'
import User from '../models/User.js'
import Seed from '../models/Seed.js'

const router = express.Router()

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'location']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' })
    }

    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    res.json(req.user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    // Count total seeds owned by user
    const totalSeeds = await Seed.countDocuments({ owner: req.user._id })
    
    // For now, return placeholder values for exchanges and connections
    // until those models are implemented
    const activeExchanges = 0
    const connections = 0

    res.json({
      totalSeeds,
      activeExchanges,
      connections
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
import express from 'express'
import { auth } from '../middleware/auth.js'
import User from '../models/User.js'
import Seed from '../models/Seed.js'
import Message from '../models/Message.js'

const router = express.Router()

// Add stats endpoint
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user._id

    // Get stats in parallel
    const [seedCount, exchangeCount, messageCount] = await Promise.all([
      // Total seeds
      Seed.countDocuments({ owner: userId }),
      
      // Active exchanges
      Seed.countDocuments({ 
        owner: userId, 
        listingType: { $in: ['exchange', 'trade'] },
        status: 'active'
      }),
      
      // Unread messages
      Message.countDocuments({
        receiver: userId,
        read: false
      })
    ])

    res.json({
      totalSeeds: seedCount,
      activeExchanges: exchangeCount,
      unreadMessages: messageCount,
      totalMessages: messageCount // You can modify this based on your needs
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    res.status(500).json({ message: 'Failed to fetch user statistics' })
  }
})

// ... other routes
export default router
import express from 'express'
import { auth } from '../middleware/auth.js'
import Message from '../models/Message.js'

const router = express.Router()

// Get all messages for current user
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
    .populate('sender', 'name')
    .populate('receiver', 'name')
    .populate('seedId', 'title')
    .sort({ createdAt: -1 })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' })
  }
})

// Send a new message
router.post('/', auth, async (req, res) => {
  try {
    const message = new Message({
      ...req.body,
      sender: req.user._id
    })
    await message.save()
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name')
      .populate('receiver', 'name')
      .populate('seedId', 'title')

    res.status(201).json(populatedMessage)
  } catch (error) {
    res.status(400).json({ message: 'Error sending message' })
  }
})

export default router
import express from 'express'
import Seed from '../models/Seed.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Get all seeds
router.get('/', async (req, res) => {
  try {
    const seeds = await Seed.find().populate('owner', 'name email')
    res.json(seeds)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get seed by ID
router.get('/:id', async (req, res) => {
  try {
    const seed = await Seed.findById(req.params.id)
      .populate('owner', 'name email location')
      .exec()
      
    if (!seed) {
      return res.status(404).json({ message: 'Seed not found' })
    }

    res.json({
      _id: seed._id,
      name: seed.name,
      description: seed.description,
      category: seed.category,
      exchangeType: seed.exchangeType,
      quantity: seed.quantity,
      location: seed.location,
      availableUntil: seed.availableUntil,
      imageURL: seed.imageURL,
      owner: seed.owner,
      createdAt: seed.createdAt
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid seed ID' })
    }
    res.status(500).json({ message: error.message })
  }
})

// Create seed
router.post('/', auth, async (req, res) => {
  try {
    const seed = new Seed({
      ...req.body,
      owner: req.user._id
    })
    await seed.save()
    res.status(201).json(seed)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update seed
router.patch('/:id', auth, async (req, res) => {
  try {
    const seed = await Seed.findOne({ _id: req.params.id, owner: req.user._id })
    if (!seed) {
      return res.status(404).json({ message: 'Seed not found' })
    }

    Object.assign(seed, req.body)
    await seed.save()
    res.json(seed)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete seed
router.delete('/:id', auth, async (req, res) => {
  try {
    const seed = await Seed.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!seed) {
      return res.status(404).json({ message: 'Seed not found' })
    }
    res.json({ message: 'Seed deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
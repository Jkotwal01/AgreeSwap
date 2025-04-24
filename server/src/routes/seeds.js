import express from 'express'
import Seed from '../models/Seed.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Get all seeds
router.get('/', async (req, res) => {
  try {
    const seeds = await Seed.find()
      .populate('owner', 'name email location')
      .sort({ createdAt: -1 })
      .exec()
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
    
    if (!seed) {
      return res.status(404).json({ message: 'Seed not found' })
    }

    res.json(seed)
  } catch (error) {
    console.error('Error fetching seed:', error)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid seed ID format' })
    }
    res.status(500).json({ message: 'Error fetching seed details' })
  }
})

// Update the create seed route
router.post('/', auth, async (req, res) => {
  try {
    console.log('Received seed creation request:', {
      body: req.body,
      user: req.user._id
    })

    // Create seed data with owner
    const seedData = {
      ...req.body,
      owner: req.user._id,
      imageURL: req.body.imageURL || 'https://via.placeholder.com/400?text=No+Image'
    }

    // Create and save the seed
    const seed = new Seed(seedData)
    await seed.save()

    // Populate owner details
    await seed.populate('owner', 'name email location')
    
    console.log('Seed created successfully:', {
      _id: seed._id,
      title: seed.title,
      owner: seed.owner._id
    })

    // Send back the created seed
    res.status(201).json(seed)
  } catch (error) {
    console.error('Seed creation error:', {
      message: error.message,
      stack: error.stack,
      errors: error.errors
    })

    // Send detailed error response
    res.status(400).json({
      message: 'Failed to create seed listing',
      details: error.message,
      validationErrors: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : undefined
    })
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
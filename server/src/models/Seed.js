import mongoose from 'mongoose'

const seedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetable', 'fruit', 'herb', 'flower', 'tree']
  },
  exchangeType: {
    type: String,
    required: true,
    enum: ['exchange', 'donate', 'request']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  location: {
    type: String,
    required: true
  },
  availableUntil: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageURL: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Add index for better query performance
seedSchema.index({ owner: 1, category: 1 })

// Add virtual for formatted date
seedSchema.virtual('formattedDate').get(function() {
  return this.availableUntil.toLocaleDateString()
})

// Ensure virtuals are included in JSON
seedSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Seed', seedSchema)
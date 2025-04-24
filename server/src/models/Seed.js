import mongoose from 'mongoose'

const seedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetable', 'herb', 'flower', 'tree', 'fruit', 'grain', 'other']
  },
  varietyName: {
    type: String,
    required: true,
    trim: true
  },
  scientificName: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit: {
    type: String,
    required: true,
    enum: ['seeds', 'grams', 'ounces']
  },
  price: {
    type: Number,
    min: 0,
    required: function() {
      return this.listingType === 'sale'
    }
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP'],
    required: function() {
      return this.listingType === 'sale'
    }
  },
  listingType: {
    type: String,
    required: true,
    enum: ['sale', 'exchange', 'free', 'wanted']
  },
  condition: {
    type: String,
    required: true,
    enum: ['fresh', 'open-pollinated', 'stored', 'organic']
  },
  origin: {
    type: String,
    required: true
  },
  germinationRate: {
    type: Number,
    min: 0,
    max: 100
  },
  harvestDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    minLength: 30
  },
  location: {
    type: String,
    required: true
  },
  shippingOption: {
    type: String,
    required: true,
    enum: ['domestic', 'international', 'pickup']
  },
  shippingPayment: {
    type: String,
    enum: ['buyer', 'seller', 'free'],
    required: function() {
      return this.shippingOption !== 'pickup'
    }
  },
  shippingCost: {
    type: Number,
    min: 0,
    required: function() {
      return this.shippingOption !== 'pickup'
    }
  },
  imageURL: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Add indexes for better query performance
seedSchema.index({ category: 1, listingType: 1 })
seedSchema.index({ owner: 1 })
seedSchema.index({ location: 1 })
seedSchema.index({ tags: 1 })

export default mongoose.model('Seed', seedSchema)
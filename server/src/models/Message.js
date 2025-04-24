import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seed',
    required: true
  },
  type: {
    type: String,
    enum: ['inquiry', 'availability', 'price', 'shipping', 'trade'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Message', messageSchema)
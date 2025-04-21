import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Seed from '../models/Seed.js'
import User from '../models/User.js'

dotenv.config()

const sampleSeeds = {
  vegetable: [
    {
      name: 'Heirloom Tomato Seeds',
      description: 'Classic beefsteak tomato variety, perfect for sandwiches and salads. Known for rich flavor and meaty texture.',
      category: 'vegetable',
      exchangeType: 'exchange',
      quantity: 50,
      location: 'Portland, OR',
      imageURL: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800'
    },
    {
      name: 'Purple Carrot Seeds',
      description: 'Heritage purple carrot variety with sweet flavor and high antioxidants.',
      category: 'vegetable',
      exchangeType: 'donate',
      quantity: 100,
      location: 'Seattle, WA',
      imageURL: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800'
    },
    {
      name: 'Rainbow Swiss Chard',
      description: 'Colorful and nutritious leafy green, easy to grow in most climates.',
      category: 'vegetable',
      exchangeType: 'exchange',
      quantity: 75,
      location: 'Austin, TX',
      imageURL: 'https://images.unsplash.com/photo-1591105627425-577d8dc541fc?w=800'
    },
    {
      name: 'Japanese Cucumber',
      description: 'Long, slender cucumbers perfect for salads and pickling.',
      category: 'vegetable',
      exchangeType: 'request',
      quantity: 30,
      location: 'San Francisco, CA',
      imageURL: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800'
    },
    {
      name: 'Bell Pepper Mix',
      description: 'Mixture of red, yellow, and green bell pepper seeds.',
      category: 'vegetable',
      exchangeType: 'exchange',
      quantity: 60,
      location: 'Denver, CO',
      imageURL: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800'
    }
  ],
  fruit: [
    {
      name: 'Heritage Strawberry Seeds',
      description: 'Sweet, compact strawberry variety perfect for container gardens.',
      category: 'fruit',
      exchangeType: 'exchange',
      quantity: 40,
      location: 'Miami, FL',
      imageURL: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=800'
    },
    {
      name: 'Alpine Raspberry',
      description: 'Compact raspberry variety that produces fruit throughout the season.',
      category: 'fruit',
      exchangeType: 'donate',
      quantity: 25,
      location: 'Portland, ME',
      imageURL: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=800'
    },
    {
      name: 'Dwarf Watermelon',
      description: 'Space-saving watermelon variety perfect for small gardens.',
      category: 'fruit',
      exchangeType: 'exchange',
      quantity: 35,
      location: 'Atlanta, GA',
      imageURL: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800'
    },
    {
      name: 'Ground Cherry',
      description: 'Sweet, husked fruits related to tomatillos.',
      category: 'fruit',
      exchangeType: 'request',
      quantity: 45,
      location: 'Chicago, IL',
      imageURL: 'https://images.unsplash.com/photo-1591638246754-77e0fbcea96c?w=800'
    },
    {
      name: 'Hardy Kiwi',
      description: 'Cold-hardy kiwi variety that produces small, sweet fruits.',
      category: 'fruit',
      exchangeType: 'exchange',
      quantity: 20,
      location: 'Boston, MA',
      imageURL: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800'
    }
  ],
  herb: [
    {
      name: 'Purple Basil',
      description: 'Aromatic purple basil variety with ornamental value.',
      category: 'herb',
      exchangeType: 'exchange',
      quantity: 100,
      location: 'New Orleans, LA',
      imageURL: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800'
    },
    {
      name: 'German Chamomile',
      description: 'Traditional medicinal herb perfect for teas.',
      category: 'herb',
      exchangeType: 'donate',
      quantity: 150,
      location: 'Nashville, TN',
      imageURL: 'https://images.unsplash.com/photo-1589466285623-73f4699ded9d?w=800'
    },
    {
      name: 'Greek Oregano',
      description: 'Authentic Greek oregano with intense flavor.',
      category: 'herb',
      exchangeType: 'exchange',
      quantity: 80,
      location: 'Phoenix, AZ',
      imageURL: 'https://images.unsplash.com/photo-1600797274570-c3c7c0912b5d?w=800'
    },
    {
      name: 'Lemon Thyme',
      description: 'Citrus-scented thyme variety, great for cooking.',
      category: 'herb',
      exchangeType: 'exchange',
      quantity: 90,
      location: 'Santa Fe, NM',
      imageURL: 'https://images.unsplash.com/photo-1594547867132-3b444c05e918?w=800'
    },
    {
      name: 'Thai Basil',
      description: 'Authentic Thai basil with distinct anise flavor.',
      category: 'herb',
      exchangeType: 'request',
      quantity: 70,
      location: 'Los Angeles, CA',
      imageURL: 'https://images.unsplash.com/photo-1589876568181-a1508b8ef473?w=800'
    }
  ],
  flower: [
    {
      name: 'Native Wildflower Mix',
      description: 'Blend of local wildflowers that attract pollinators.',
      category: 'flower',
      exchangeType: 'donate',
      quantity: 200,
      location: 'Burlington, VT',
      imageURL: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800'
    },
    {
      name: 'Moonflower Seeds',
      description: 'Night-blooming, fragrant white flowers.',
      category: 'flower',
      exchangeType: 'exchange',
      quantity: 50,
      location: 'Savannah, GA',
      imageURL: 'https://images.unsplash.com/photo-1589519160732-57fc6fdf3a5e?w=800'
    },
    {
      name: 'California Poppy',
      description: 'Drought-tolerant native orange poppies.',
      category: 'flower',
      exchangeType: 'exchange',
      quantity: 150,
      location: 'Sacramento, CA',
      imageURL: 'https://images.unsplash.com/photo-1589074189857-c53a0739857f?w=800'
    },
    {
      name: 'Butterfly Weed',
      description: 'Native milkweed that attracts monarch butterflies.',
      category: 'flower',
      exchangeType: 'donate',
      quantity: 100,
      location: 'Kansas City, MO',
      imageURL: 'https://images.unsplash.com/photo-1566808907623-9c4cb8791c27?w=800'
    },
    {
      name: 'Coneflower Mix',
      description: 'Mixed colors of drought-tolerant echinacea.',
      category: 'flower',
      exchangeType: 'exchange',
      quantity: 75,
      location: 'Minneapolis, MN',
      imageURL: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800'
    }
  ],
  tree: [
    {
      name: 'Sugar Maple',
      description: 'Classic maple tree known for fall color and syrup production.',
      category: 'tree',
      exchangeType: 'exchange',
      quantity: 25,
      location: 'Madison, WI',
      imageURL: 'https://images.unsplash.com/photo-1589990981269-a8ef54e5f121?w=800'
    },
    {
      name: 'Serviceberry',
      description: 'Native tree with edible berries and spring flowers.',
      category: 'tree',
      exchangeType: 'donate',
      quantity: 30,
      location: 'Ann Arbor, MI',
      imageURL: 'https://images.unsplash.com/photo-1588616279831-c394d0623f08?w=800'
    },
    {
      name: 'Pawpaw Tree',
      description: 'Native fruit tree with tropical-tasting fruits.',
      category: 'tree',
      exchangeType: 'request',
      quantity: 15,
      location: 'Columbus, OH',
      imageURL: 'https://images.unsplash.com/photo-1598760122223-45c0f1b803ae?w=800'
    },
    {
      name: 'American Persimmon',
      description: 'Native persimmon tree with sweet fall fruits.',
      category: 'tree',
      exchangeType: 'exchange',
      quantity: 20,
      location: 'Richmond, VA',
      imageURL: 'https://images.unsplash.com/photo-1602317878015-ded46d5b3282?w=800'
    },
    {
      name: 'Hazelnut Tree',
      description: 'Productive nut tree perfect for food forests.',
      category: 'tree',
      exchangeType: 'exchange',
      quantity: 35,
      location: 'Eugene, OR',
      imageURL: 'https://images.unsplash.com/photo-1573851841000-a58115607657?w=800'
    }
  ]
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Create test user if doesn't exist
    const testUser = await User.findOne({ email: 'test@example.com' })
    const userId = testUser ? testUser._id : (await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      location: 'Portland, OR'
    }))._id

    // Clear existing seeds
    await Seed.deleteMany({})

    // Add all sample seeds
    for (const category in sampleSeeds) {
      for (const seedData of sampleSeeds[category]) {
        await Seed.create({
          ...seedData,
          owner: userId,
          availableUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
        })
      }
    }

    console.log('Sample seed data created successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedDatabase()
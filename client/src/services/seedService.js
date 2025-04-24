import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getSeeds = async () => {
  try {
    const response = await axios.get(`${API_URL}/seeds`)
    return response.data || []
  } catch (error) {
    console.error('Error fetching seeds:', error)
    throw new Error(error.response?.data?.message || 'Failed to fetch seeds')
  }
}

export const getSeedById = async (id) => {
  const response = await axios.get(`${API_URL}/seeds/${id}`)
  return response.data
}

export const createSeed = async (seedData, token) => {
  try {
    // Format the data before sending
    const formattedData = {
      ...seedData,
      harvestDate: new Date(seedData.harvestDate).toISOString(),
      imageURL: seedData.imageURL || 'https://via.placeholder.com/400?text=No+Image'
    }

    const response = await axios.post(
      `${API_URL}/seeds`,
      formattedData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    // Handle validation errors from the server
    if (error.response?.data?.validationErrors) {
      throw new Error(
        Object.values(error.response.data.validationErrors)
          .map(err => err.message)
          .join(', ')
      )
    }
    throw new Error(error.response?.data?.message || 'Failed to create seed listing')
  }
}

export const fetchSeedById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/seeds/${id}`)
    
    if (!response.data) {
      throw new Error('No data received')
    }

    // Ensure we have a valid image URL
    const seedData = {
      ...response.data,
      imageURL: response.data.imageURL || 'https://via.placeholder.com/400?text=No+Image'
    }

    return seedData
  } catch (error) {
    console.error('Error fetching seed:', error)
    if (error.response?.status === 404) {
      throw new Error('Seed not found')
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch seed details')
  }
}
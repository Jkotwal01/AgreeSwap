import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getSeeds = async () => {
  const response = await axios.get(`${API_URL}/seeds`)
  return response.data
}

export const getSeedById = async (id) => {
  const response = await axios.get(`${API_URL}/seeds/${id}`)
  return response.data
}

export const createSeed = async (seedData, token) => {
  const response = await axios.post(`${API_URL}/seeds`, seedData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const fetchSeedById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/seeds/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch seed')
  }
}
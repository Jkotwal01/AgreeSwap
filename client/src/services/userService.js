import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const fetchUserStats = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(
      `${API_URL}/users/stats`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!response.data) {
      throw new Error('No data received')
    }

    return response.data
  } catch (error) {
    console.error('Error fetching user stats:', error)
    throw new Error(error.response?.data?.message || 'Failed to fetch statistics')
  }
}

export const fetchSellerDetails = async (sellerId) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(
      `${API_URL}/users/${sellerId}/contact`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch seller details')
  }
}

export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token')
  try {
    console.log('Updating profile with data:', userData)
    
    const response = await axios.put(
      `${API_URL}/users/profile`,
      userData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.data) {
      throw new Error('No response from server')
    }

    return response.data
  } catch (error) {
    console.error('Profile update error:', error.response?.data || error)
    throw new Error(
      error.response?.data?.message || 
      'Failed to update profile. Please try again.'
    )
  }
}
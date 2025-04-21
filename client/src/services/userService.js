import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const fetchUserStats = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_URL}/users/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user stats')
  }
}

export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(`${API_URL}/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile')
  }
}
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const fetchMessages = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(
      `${API_URL}/messages`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch messages')
  }
}

export const sendMessage = async (messageData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_URL}/messages`,
      messageData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send message')
  }
}
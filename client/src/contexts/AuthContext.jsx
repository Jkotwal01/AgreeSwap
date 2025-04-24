import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, getCurrentUser } from '../services/authService'
import { updateUserProfile } from '../services/userService'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getCurrentUser(token)
        .then(userData => {
          setUser(userData)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials) => {
    const { user: userData, token } = await loginUser(credentials)
    localStorage.setItem('token', token)
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateProfile = async (userData) => {
    try {
      const updatedUser = await updateUserProfile(userData)
      setUser(updatedUser)
      return updatedUser
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
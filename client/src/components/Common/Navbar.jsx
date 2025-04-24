import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaLeaf, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaEnvelope } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaLeaf className="text-2xl" />
          <span className="text-xl font-bold">SeedSwap</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/seeds" className="hover:text-green-200 transition">Browse Seeds</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-green-200 transition">Dashboard</Link>
              <div className="flex items-center space-x-2">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 bg-green-800 hover:bg-green-900 px-3 py-1 rounded transition"
                >
                  <FaUser />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-green-800 hover:bg-green-900 px-3 py-1 rounded transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link 
                to="/login" 
                className="flex items-center space-x-1 bg-green-800 hover:bg-green-900 px-3 py-1 rounded transition"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="flex items-center space-x-1 bg-green-600 hover:bg-green-800 px-3 py-1 rounded transition"
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
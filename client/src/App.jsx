import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/Common/PrivateRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import SeedsPage from './pages/Seeds/SeedsPage'
import SeedDetailPage from './pages/Seeds/SeedDetailPage'
import NewSeedPage from './pages/Seeds/NewSeedPage'
import ProfilePage from './pages/Profile/ProfilePage'
import EditProfilePage from './pages/Profile/EditProfilePage'
import MessagesPage from './pages/Messages/MessagesPage'

import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer'
import { Link } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/seeds" element={<SeedsPage />} />
              <Route path="/seeds/:id" element={<SeedDetailPage />} />
              <Route 
                path="/profile" 
                element={<PrivateRoute><ProfilePage /></PrivateRoute>} 
              />
              <Route 
                path="/profile/edit" 
                element={<PrivateRoute><EditProfilePage /></PrivateRoute>} 
              />
              <Route 
                path="/seeds/new" 
                element={<PrivateRoute><NewSeedPage /></PrivateRoute>} 
              />
              <Route path="/messages" element={
                <PrivateRoute>
                  <MessagesPage />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
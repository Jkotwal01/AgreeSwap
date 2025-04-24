import { Link } from 'react-router-dom'
import { FaSeedling, FaExchangeAlt, FaHandsHelping, FaSearch } from 'react-icons/fa'
import heroImage from '../assets/farm.jpg'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div>
      {user && (
        <section className="bg-green-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h2>
              <div className="flex space-x-4">
                <Link
                  to="/dashboard"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white py-20 overflow-hidden">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
               }}
          />
        </div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Swap Seeds, Grow Community
            </h1>
            <p className="text-xl mb-8 animate-fade-in-delay">
              Connect with local growers to exchange native seeds and preserve biodiversity.
            </p>
            <div className="flex space-x-4 animate-fade-in-delay-2">
              <Link 
                to="/register" 
                className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold 
                         hover:bg-gray-100 transition duration-300 transform hover:scale-105
                         shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link 
                to="/seeds" 
                className="border-2 border-white px-6 py-3 rounded-lg font-semibold
                         hover:bg-white hover:text-green-700 transition duration-300
                         transform hover:scale-105"
              >
                Browse Seeds
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 transform hover:scale-105 transition duration-500">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 
                            rounded-lg blur opacity-25 group-hover:opacity-75 transition 
                            duration-1000 group-hover:duration-200">
              </div>
              <img 
                src={heroImage} 
                alt="Hands holding seeds" 
                className="relative rounded-lg shadow-2xl max-w-full h-auto 
                         transform transition duration-500 hover:brightness-110" 
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t 
                            from-black/50 to-transparent rounded-b-lg opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">
                  Join our community of seed savers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations to your CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How SeedSwap Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Seeds</h3>
              <p className="text-gray-600">
                Browse native seeds available in your region from local growers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaExchangeAlt className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Exchange</h3>
              <p className="text-gray-600">
                Request seeds for exchange, donation, or make your own available.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaHandsHelping className="text-2xl text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Community</h3>
              <p className="text-gray-600">
                Share knowledge, build trust, and strengthen local biodiversity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Swapping Seeds?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of seed savers and help preserve native plant diversity.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}
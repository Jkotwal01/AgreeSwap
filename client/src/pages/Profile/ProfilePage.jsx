import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaEdit, FaSeedling, 
         FaPhone, FaGlobe, FaUserCircle, FaCalendarAlt, FaExchangeAlt,
         FaListAlt, FaStar } from 'react-icons/fa'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg">
        {/* Profile Header */}
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <FaUserCircle className="h-16 w-16 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-1" />
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Link
            to="/profile/edit"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </Link>
        </div>
        
        <div className="border-t border-gray-200">
          {/* Contact Information */}
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaEnvelope className="mr-2 text-green-600" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>

              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaPhone className="mr-2 text-green-600" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.phone || 'Not provided'}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-green-600" />
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.location}</dd>
              </div>

              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaGlobe className="mr-2 text-green-600" />
                  Website
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.website ? (
                    <a href={user.website} className="text-green-600 hover:text-green-700">
                      {user.website}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </dd>
              </div>
            </dl>
          </div>

          {/* Trading Statistics */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Trading Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaSeedling className="mr-2 text-green-600" />
                  Active Listings
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {user?.activeListings || 0}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaExchangeAlt className="mr-2 text-green-600" />
                  Completed Trades
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {user?.completedTrades || 0}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaStar className="mr-2 text-green-600" />
                  Rating
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {user?.rating ? `${user.rating}/5` : 'N/A'}
                </dd>
              </div>
            </div>
          </div>

          {/* Bio/Description */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">About Me</h2>
            <p className="text-gray-700">
              {user?.bio || 'No bio provided yet. Tell others about yourself and your gardening interests!'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/seeds/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <FaSeedling className="mr-2" />
                Add New Listing
              </Link>
              
              <Link
                to="/profile/listings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaListAlt className="mr-2" />
                My Listings
              </Link>

              <Link
                to="/profile/trades"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaExchangeAlt className="mr-2" />
                Trade History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
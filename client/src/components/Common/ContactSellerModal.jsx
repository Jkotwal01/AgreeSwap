import { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaSeedling, FaStar } from 'react-icons/fa'
import { fetchSellerDetails } from '../../services/userService'

export default function ContactSellerModal({ seedId, seedTitle, sellerId, onClose }) {
  const [seller, setSeller] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [messageData, setMessageData] = useState({
    type: 'inquiry',
    message: ''
  })

  useEffect(() => {
    const loadSellerDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchSellerDetails(sellerId)
        setSeller(data)
      } catch (err) {
        setError('Failed to load seller details')
      } finally {
        setLoading(false)
      }
    }

    if (sellerId) {
      loadSellerDetails()
    }
  }, [sellerId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Here you would implement the message sending logic
      console.log('Message Data:', { seedId, seedTitle, sellerId, ...messageData })
      onClose()
    } catch (err) {
      setError('Failed to send message')
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Contact Seller</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {seller && (
          <>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaSeedling className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">{seller.name}</h3>
                  <p className="text-sm text-gray-500">
                    Member since {new Date(seller.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {seller.email && (
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-gray-400" />
                    <span>{seller.email}</span>
                  </div>
                )}
                {seller.phone && (
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-gray-400" />
                    <span>{seller.phone}</span>
                  </div>
                )}
                {seller.location && (
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{seller.location}</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regarding
                </label>
                <p className="text-gray-600 mb-4">{seedTitle}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message Type
                </label>
                <select
                  value={messageData.type}
                  onChange={(e) => setMessageData({ ...messageData, type: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="inquiry">General Inquiry</option>
                  <option value="availability">Check Availability</option>
                  <option value="price">Price Discussion</option>
                  <option value="shipping">Shipping Information</option>
                  <option value="trade">Trade Proposal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  value={messageData.message}
                  onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
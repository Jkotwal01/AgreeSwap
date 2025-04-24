import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchMessages } from '../../services/messageService'
import { FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa'

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true)
        const data = await fetchMessages()
        setMessages(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMessages()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {messages.map((message) => (
            <li key={message._id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {message.read ? (
                      <FaEnvelopeOpen className="text-gray-400 mr-3" />
                    ) : (
                      <FaEnvelope className="text-green-600 mr-3" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {message.type.charAt(0).toUpperCase() + message.type.slice(1)} about{' '}
                        <Link 
                          to={`/seeds/${message.seedId}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          {message.seedId.title}
                        </Link>
                      </p>
                      <p className="text-sm text-gray-500">
                        From: {message.sender.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{message.message}</p>
                </div>
              </div>
            </li>
          ))}
          {messages.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No messages yet
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import { fetchMessages } from '../../services/messageService'

export default function MessageIndicator() {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const getUnreadCount = async () => {
      try {
        const messages = await fetchMessages()
        const unread = messages.filter(msg => !msg.read).length
        setUnreadCount(unread)
      } catch (error) {
        console.error('Failed to fetch unread messages:', error)
      }
    }

    getUnreadCount()
    // Refresh every minute
    const interval = setInterval(getUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Link 
      to="/messages"
      className="relative p-2 hover:bg-gray-100 rounded-full"
    >
      <FaEnvelope className="text-xl text-green-600" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                        rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Link>
  )
}
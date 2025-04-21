import { Link } from 'react-router-dom'
import { FaSeedling, FaExchangeAlt, FaHandHoldingHeart, FaHandsHelping } from 'react-icons/fa'

export default function SeedCard({ seed }) {
  const getExchangeTypeIcon = () => {
    switch (seed.exchangeType) {
      case 'exchange':
        return <FaExchangeAlt className="text-blue-500" />
      case 'donate':
        return <FaHandHoldingHeart className="text-green-500" />
      case 'request':
        return <FaHandsHelping className="text-yellow-500" />
      default:
        return <FaSeedling className="text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative h-48 bg-gray-200">
        {seed.imageURL ? (
          <img src={seed.imageURL} alt={seed.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaSeedling className="text-4xl text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
          {getExchangeTypeIcon()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{seed.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{seed.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {seed.category}
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Qty: {seed.availableQty}
          </span>
        </div>
        <Link 
          to={`/seeds/${seed._id}`}
          className="mt-3 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
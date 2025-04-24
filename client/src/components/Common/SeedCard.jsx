import { Link } from 'react-router-dom'
import { FaSeedling, FaExchangeAlt, FaHandHoldingHeart, FaHandsHelping, 
         FaMoneyBill, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa'

export default function SeedCard({ seed }) {
  const getListingTypeIcon = () => {
    switch (seed.listingType) {
      case 'exchange':
        return <FaExchangeAlt className="text-blue-500" title="Exchange" />
      case 'free':
        return <FaHandHoldingHeart className="text-green-500" title="Free" />
      case 'wanted':
        return <FaHandsHelping className="text-yellow-500" title="Wanted" />
      case 'sale':
        return <FaMoneyBill className="text-green-500" title="For Sale" />
      default:
        return <FaSeedling className="text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={seed.imageURL}
          alt={seed.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://via.placeholder.com/400?text=No+Image'
          }}
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          {getListingTypeIcon()}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {seed.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2 truncate">
          {seed.varietyName}
        </p>

        {/* Category and Quantity */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaLeaf className="mr-1" />
            {seed.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {seed.quantity} {seed.unit}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <FaMapMarkerAlt className="mr-1" />
          {seed.location}
        </div>

        {/* Price or Exchange Info */}
        <div className="mb-4">
          {seed.listingType === 'sale' ? (
            <p className="text-lg font-semibold text-green-600">
              {seed.price} {seed.currency}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              {seed.listingType === 'exchange' ? 'Available for Exchange' :
               seed.listingType === 'free' ? 'Free to Good Home' : 'Looking for Seeds'}
            </p>
          )}
        </div>

        {/* View Details Button */}
        <Link
          to={`/seeds/${seed._id}`}
          className="block w-full text-center bg-green-600 hover:bg-green-700 
                   text-white py-2 rounded-md transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
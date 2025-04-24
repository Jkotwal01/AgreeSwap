import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchSeedById } from '../../services/seedService'
import { 
  FaMapMarkerAlt, FaUser, FaLeaf, FaCalendar, FaExchangeAlt,
  FaSeedling, FaShippingFast, FaPercent, FaGlobe, FaArrowLeft,
  FaTag, FaClock, FaInfo, FaBox
} from 'react-icons/fa'
import ContactSellerModal from '../../components/Common/ContactSellerModal'
import ImageSection from '../../components/Seeds/ImageSection'

export default function SeedDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [seed, setSeed] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    const loadSeed = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchSeedById(id)
        if (!data) {
          throw new Error('Seed not found')
        }
        setSeed(data)
      } catch (err) {
        console.error('Error loading seed:', err)
        setError(err.message || 'Failed to load seed details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadSeed()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaLeaf className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => navigate('/seeds')}
                className="mt-2 text-red-700 underline hover:text-red-800"
              >
                Back to Seeds
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!seed) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">No seed found with ID: {id}</p>
          <button
            onClick={() => navigate('/seeds')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Back to Seeds
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Link 
          to="/seeds"
          className="inline-flex items-center mb-6 text-green-600 hover:text-green-700 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Seeds Catalog</span>
        </Link>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section with enhanced styling */}
            <div className="md:w-1/2 relative bg-gray-50">
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm 
                                font-semibold shadow-lg">
                  {seed.listingType === 'sale' ? 'For Sale' : 'For Trade'}
                </span>
              </div>
              
              {/* Image Container */}
              <div className="h-full">
                <ImageSection imageURL={seed.imageURL} />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8">
              {/* Header Section */}
              <div className="border-b pb-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{seed.title}</h1>
                  {seed.listingType === 'sale' && (
                    <div className="text-2xl font-bold text-green-600">
                      {seed.price} {seed.currency}
                    </div>
                  )}
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-green-500" />
                  {seed.location}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <FaTag className="mr-1" />
                    {seed.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {seed.varietyName}
                  </span>
                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Quantity</div>
                  <div className="font-semibold flex items-center">
                    <FaBox className="mr-2 text-green-600" />
                    {seed.quantity} {seed.unit}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Harvest Date</div>
                  <div className="font-semibold flex items-center">
                    <FaClock className="mr-2 text-green-600" />
                    {new Date(seed.harvestDate).toLocaleDateString()}
                  </div>
                </div>

                {seed.germinationRate && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Germination Rate</div>
                    <div className="font-semibold flex items-center">
                      <FaPercent className="mr-2 text-green-600" />
                      {seed.germinationRate}%
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Origin</div>
                  <div className="font-semibold flex items-center">
                    <FaGlobe className="mr-2 text-green-600" />
                    {seed.origin}
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaInfo className="mr-2 text-green-600" />
                  Description
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {seed.description}
                  </p>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaShippingFast className="mr-2 text-green-600" />
                  Shipping
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700">
                    {seed.shippingOption === 'pickup' 
                      ? 'Local Pickup Only' 
                      : `Ships ${seed.shippingOption}`
                    }
                  </p>
                </div>
              </div>

              {/* Seller Section */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FaUser className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{seed.owner.name}</div>
                      <div className="text-sm text-gray-500">Seed Provider</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                             transition-colors duration-300 flex items-center shadow-lg hover:shadow-xl"
                  >
                    <FaExchangeAlt className="mr-2" />
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showContactModal && (
        <ContactSellerModal
          seedId={seed._id}
          seedTitle={seed.title}
          sellerId={seed.owner._id}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  )
}
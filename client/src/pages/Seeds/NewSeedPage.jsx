import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { createSeed } from '../../services/seedService'
import { 
  FaSeedling, FaLeaf, FaGlobe, FaShippingFast,
  FaMoneyBill, FaExchangeAlt, FaInfo
} from 'react-icons/fa'

export default function NewSeedPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    seedName: '',
    category: '',
    description: '',
    quantity: '',
    unit: 'seeds',
    season: '',
    germinationRate: '',
    imageURL: '',
    region: user?.location || '',
    exchangeType: '',
    price: '',
    currency: 'INR',
    desiredExchange: '',
    availableFrom: '',
    availableTill: '',
    deliveryOptions: [],
    visibility: 'public',
    contactPreference: 'in-app'
  })
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState({ show: false, type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'vegetable', label: 'Vegetable' },
    { value: 'herb', label: 'Herb' },
    { value: 'flower', label: 'Flower' },
    { value: 'tree', label: 'Tree' },
    { value: 'fruit', label: 'Fruit' },
    { value: 'grain', label: 'Grain' },
    { value: 'other', label: 'Other' }
  ]

  const listingTypes = [
    { value: 'sale', label: 'For Sale' },
    { value: 'exchange', label: 'For Exchange' },
    { value: 'free', label: 'Free' },
    { value: 'wanted', label: 'Wanted' }
  ]

  const conditions = [
    { value: 'fresh', label: 'Fresh' },
    { value: 'open-pollinated', label: 'Open Pollinated' },
    { value: 'stored', label: 'Stored' },
    { value: 'organic', label: 'Organic' }
  ]

  const shippingOptions = [
    { value: 'domestic', label: 'Domestic Shipping' },
    { value: 'international', label: 'International Shipping' },
    { value: 'pickup', label: 'Local Pickup Only' }
  ]

  const seasons = [
    { value: 'rabi', label: 'Rabi (Winter)' },
    { value: 'kharif', label: 'Kharif (Monsoon)' },
    { value: 'zaid', label: 'Zaid (Summer)' },
    { value: 'all-season', label: 'All Season' }
  ]

  const exchangeTypes = [
    { value: 'sell', label: 'Sell Seeds' },
    { value: 'buy', label: 'Buy Seeds' },
    { value: 'exchange', label: 'Exchange Seeds' },
    { value: 'donate', label: 'Donate Seeds' }
  ]

  const deliveryOptions = [
    { value: 'self-pickup', label: 'Self Pickup' },
    { value: 'courier', label: 'Courier Service' },
    { value: 'local-meetup', label: 'Local Meet-up' }
  ]

  const visibilityOptions = [
    { value: 'public', label: 'Public Listing' },
    { value: 'private', label: 'Private Listing' }
  ]

  const contactPreferences = [
    { value: 'in-app', label: 'In-app Chat' },
    { value: 'phone', label: 'Phone' },
    { value: 'email', label: 'Email' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Required fields
    if (!formData.seedName) newErrors.seedName = 'Seed name is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.quantity) newErrors.quantity = 'Quantity is required'
    if (!formData.season) newErrors.season = 'Growing season is required'
    if (!formData.region) newErrors.region = 'Region is required'
    if (!formData.exchangeType) newErrors.exchangeType = 'Exchange type is required'
    if (!formData.visibility) newErrors.visibility = 'Visibility setting is required'
    
    // Conditional validation
    if (formData.exchangeType === 'sell' && !formData.price) {
      newErrors.price = 'Price is required for selling'
    }
    
    if (formData.exchangeType === 'exchange' && !formData.desiredExchange) {
      newErrors.desiredExchange = 'Please specify what seeds you want in exchange'
    }
    
    // Description length
    if (formData.description && formData.description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters'
    }
    
    // Germination rate range
    if (formData.germinationRate) {
      const rate = Number(formData.germinationRate)
      if (isNaN(rate) || rate < 0 || rate > 100) {
        newErrors.germinationRate = 'Germination rate must be between 0 and 100'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus({ show: false, type: '', message: '' })
    
    if (!validateForm()) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Please fix the errors before submitting'
      })
      return
    }

    try {
      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      await createSeed(formData, token)
      
      setSubmitStatus({
        show: true,
        type: 'success',
        message: 'Seed listing created successfully!'
      })

      // Redirect after success
      setTimeout(() => navigate('/seeds'), 2000)
    } catch (error) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: error.message
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <FaSeedling className="mr-2 text-green-600" />
        Add New Seed Listing
      </h1>

      {submitStatus.show && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Seed Information Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center">
            <FaSeedling className="mr-2 text-green-600" />
            Seed Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seed Name *
              </label>
              <input
                type="text"
                name="seedName"
                value={formData.seedName}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.seedName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Desi Tomato"
              />
              {errors.seedName && (
                <p className="mt-1 text-sm text-red-500">{errors.seedName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full p-2 border rounded-md ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the seed variety, its origin, and uses..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Exchange Preferences Section */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold flex items-center">
            <FaExchangeAlt className="mr-2 text-green-600" />
            Exchange Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exchange Type *
              </label>
              <select
                name="exchangeType"
                value={formData.exchangeType}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.exchangeType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Type</option>
                {exchangeTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.exchangeType && (
                <p className="mt-1 text-sm text-red-500">{errors.exchangeType}</p>
              )}
            </div>

            {formData.exchangeType === 'sell' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (INR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>
            )}

            {formData.exchangeType === 'exchange' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Exchange *
                </label>
                <input
                  type="text"
                  name="desiredExchange"
                  value={formData.desiredExchange}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.desiredExchange ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Looking for native corn seeds"
                />
                {errors.desiredExchange && (
                  <p className="mt-1 text-sm text-red-500">{errors.desiredExchange}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/seeds')}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-white rounded-md ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  )
}
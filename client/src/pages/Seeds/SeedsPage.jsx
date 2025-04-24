import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SeedCard from '../../components/Common/SeedCard'
import { getSeeds } from '../../services/seedService'
import { FaFilter, FaSearch, FaPlus } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

export default function SeedsPage() {
  const { user } = useAuth()
  const [seeds, setSeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    exchangeType: '',
  })

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        setLoading(true)
        const data = await getSeeds()
        setSeeds(data)
        setError('')
      } catch (err) {
        setError('Failed to fetch seeds')
        console.error('Error fetching seeds:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSeeds()
  }, []) // Refresh seeds when page loads

  const filteredSeeds = seeds.filter(seed => {
    const matchesSearch = seed.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         seed.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seed.varietyName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !filters.category || seed.category === filters.category
    const matchesListingType = !filters.exchangeType || seed.listingType === filters.exchangeType
    
    return matchesSearch && matchesCategory && matchesListingType
  })

  // Update the filter component options to match the schema:
  const filterOptions = {
    category: [
      { value: '', label: 'All Categories' },
      { value: 'vegetable', label: 'Vegetable' },
      { value: 'herb', label: 'Herb' },
      { value: 'flower', label: 'Flower' },
      { value: 'tree', label: 'Tree' },
      { value: 'fruit', label: 'Fruit' },
      { value: 'grain', label: 'Grain' },
      { value: 'other', label: 'Other' }
    ],
    listingType: [
      { value: '', label: 'All Types' },
      { value: 'sale', label: 'For Sale' },
      { value: 'exchange', label: 'For Exchange' },
      { value: 'free', label: 'Free' },
      { value: 'wanted', label: 'Wanted' }
    ]
  }

  // Update the filter dropdowns:
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Native Seeds</h1>
          <p className="text-gray-600">
            Discover seeds available for exchange, donation, or request in your community.
          </p>
        </div>
        {user && (
          <Link
            to="/seeds/new"
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FaPlus className="mr-2" />
            Add New Seed
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search seeds..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              {filterOptions.category.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.exchangeType}
              onChange={(e) => setFilters({...filters, exchangeType: e.target.value})}
            >
              {filterOptions.listingType.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ... keep existing grid and loading/error states ... */}
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading seeds...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      ) : filteredSeeds.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No seeds found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filters.category || filters.exchangeType 
              ? 'Try adjusting your search or filters'
              : 'Be the first to add seeds to the community!'}
          </p>
          {user && (
            <Link
              to="/seeds/new"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
            >
              <FaPlus className="mr-2" />
              Add New Seed
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSeeds.map(seed => (
            <SeedCard key={seed._id} seed={seed} />
          ))}
        </div>
      )}
    </div>
  )
}
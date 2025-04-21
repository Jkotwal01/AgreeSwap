import { useEffect, useState } from 'react'
import SeedCard from '../../components/Common/SeedCard'
import { getSeeds } from '../../services/seedService'
import { FaFilter, FaSearch } from 'react-icons/fa'

export default function SeedsPage() {
  const [seeds, setSeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    exchangeType: '',
    season: ''
  })

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const data = await getSeeds()
        setSeeds(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching seeds:', error)
        setLoading(false)
      }
    }
    fetchSeeds()
  }, [])

  const filteredSeeds = seeds.filter(seed => {
    const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         seed.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filters.category || seed.category === filters.category
    const matchesExchangeType = !filters.exchangeType || seed.exchangeType === filters.exchangeType
    const matchesSeason = !filters.season || seed.season === filters.season
    
    return matchesSearch && matchesCategory && matchesExchangeType && matchesSeason
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading seeds...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Native Seeds</h1>
        <p className="text-gray-600">
          Discover seeds available for exchange, donation, or request in your community.
        </p>
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
          <div className="flex items-center space-x-2">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="herb">Herb</option>
              <option value="flower">Flower</option>
              <option value="tree">Tree</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.exchangeType}
              onChange={(e) => setFilters({...filters, exchangeType: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="exchange">Exchange</option>
              <option value="donate">Donate</option>
              <option value="request">Request</option>
            </select>
            <button className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {filteredSeeds.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No seeds found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
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
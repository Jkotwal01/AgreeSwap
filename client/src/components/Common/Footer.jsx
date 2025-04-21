import { FaLeaf, FaGithub, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-2xl" />
              <span className="text-xl font-bold">SeedSwap</span>
            </div>
            <p className="text-green-200">
              Connecting seed savers and promoting biodiversity in our communities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/seeds" className="text-green-200 hover:text-white transition">
                  Browse Seeds
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-green-200 hover:text-white transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  Seed Saving Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-green-200 hover:text-white transition"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-green-200 hover:text-white transition"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} SeedSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
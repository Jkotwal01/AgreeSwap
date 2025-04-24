import { useState } from 'react'
import { FaSearchPlus } from 'react-icons/fa'

export default function ImageSection({ imageURL }) {
  const [error, setError] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  return (
    <>
      <div className="relative h-full min-h-[400px] bg-gray-50">
        <img
          src={error ? 'https://via.placeholder.com/800x600?text=No+Image' : imageURL}
          alt="Seed"
          className="w-full h-full object-cover object-center"
          style={{ aspectRatio: '4/3' }}
          onError={() => setError(true)}
        />
        
        {/* Zoom overlay on hover */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 
                     transition-all duration-300 cursor-zoom-in flex items-center 
                     justify-center opacity-0 hover:opacity-100"
          onClick={() => setShowFullImage(true)}
        >
          <FaSearchPlus className="text-white text-3xl" />
        </div>
      </div>

      {/* Full screen image modal */}
      {showFullImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center 
                     justify-center p-4 cursor-zoom-out"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <img
              src={imageURL}
              alt="Seed Full View"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 
                         bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setShowFullImage(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
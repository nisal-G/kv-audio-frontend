export default function ProductCard(props) {

  const item = props.item;

  return (
    <div className="w-[320px] h-[480px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:scale-105">
      {/* Image Section */}
      <div className="relative w-full h-[220px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {item.image && item.image.length > 0 ? (
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${item.availability
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
          }`}>
          {item.availability ? '✓ In Stock' : '✗ Out of Stock'}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white capitalize">
          {item.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {item.description || 'No description available'}
        </p>

        {/* Dimensions */}
        {item.dimensions && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{item.dimensions}</span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-2xl font-bold text-green-600">
              ${item.price.toLocaleString()}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${item.availability
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={!item.availability}
          >
            {item.availability ? 'View Details' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}
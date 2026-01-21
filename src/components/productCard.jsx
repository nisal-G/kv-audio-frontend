import { Link } from "react-router-dom";

export default function ProductCard(props) {

  const item = props.item;

  return (
    <div className="w-full max-w-[380px] mx-auto h-[500px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:scale-[1.02] group">
      {/* Image Section */}
      <div className="relative w-full h-[240px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {item.image && item.image.length > 0 ? (
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${item.availability
          ? 'bg-green-500/95 text-white shadow-lg shadow-green-500/30'
          : 'bg-red-500/95 text-white shadow-lg shadow-red-500/30'
          }`}>
          {item.availability ? '✓ In Stock' : '✗ Out of Stock'}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white capitalize shadow-lg shadow-blue-600/30 backdrop-blur-sm">
          {item.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col h-[260px]">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px] flex-grow-0">
          {item.description || 'No description available'}
        </p>

        {/* Dimensions */}
        {item.dimensions && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="truncate">{item.dimensions}</span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Price</p>
            <p className="text-2xl font-bold text-green-600 mt-0.5">
              ${item.price.toLocaleString()}
            </p>
          </div>

          {/* View Details Button */}
          <Link to={"/product/" + item.key}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${item.availability
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!item.availability}
          >
            {item.availability ? (
              <>
                View
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            ) : (
              'Unavailable'
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}
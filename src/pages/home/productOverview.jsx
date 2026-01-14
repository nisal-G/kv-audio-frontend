import { IoCart, IoPricetagOutline, IoResizeOutline, IoScanOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {

  // Get the product key from the URL parameters
  const params = useParams()
  const key = params.key

  // State to manage loading, error, and product data
  const [loadingState, setLoadingState] = useState("loading") // loading, error, loaded
  const [product, setProduct] = useState({})

  // Fetch product data when component mounts or key changes 
  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/products/get/${key}`

    axios.get(apiUrl)
      .then((res) => {
        setProduct(res.data)
        setLoadingState("loaded")
        console.log(res.data)
      })
      .catch((error) => {
        console.error("Error fetching product data:", error)
        setLoadingState("error")
      })
  }, [key])




  return (
    <div className="w-full min-h-[80vh] bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      {
        loadingState === "loading" &&
        <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 animate-spin rounded-full"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading details...</p>
        </div>
      }
      {
        loadingState === "error" && (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
              <IoScanOutline size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Failed to load product</h3>
            <p className="text-gray-500 max-w-md">We couldn't retrieve the product details. Please check your internet connection and try again.</p>
          </div>
        )
      }
      {
        loadingState === "loaded" &&
        <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden flex flex-col lg:flex-row border border-white">

          {/* Image Section */}
          <div className="w-full lg:w-1/2 bg-gray-100/50 p-4 lg:p-8 flex items-center justify-center min-h-[400px]">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-sm bg-white">
              <ImageSlider images={product.image} />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center">

            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-4">
                <IoPricetagOutline />
                {product.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <IoResizeOutline /> Dimensions
                </p>
                <p className="text-lg font-bold text-gray-900">{product.dimensions}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Availability</p>
                <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> In Stock
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-gray-100">
              <div className="flex flex-col">
       
                <span className="text-4xl font-black text-blue-600">
                  <span className="text-2xl align-top mr-1">Rs.</span>
                  {product.price.toLocaleString()}
                </span>
              </div>

              <button
                className="flex-1 w-full sm:w-auto px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 hover:shadow-2xl hover:-translate-y-1 active:scale-95 duration-200 flex items-center justify-center gap-3 group"
                onClick={() => {
                  addToCart(product.key, 1);
                  console.log(loadCart());
                  toast.success("Added to cart", {
                    style: {
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                    iconTheme: {
                      primary: '#fff',
                      secondary: '#333',
                    },
                  })
                }}
              >
                <IoCart className="text-2xl group-hover:scale-110 transition-transform" />
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      }
    </div>
  )
}
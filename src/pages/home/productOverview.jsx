import { IoCart, IoPricetagOutline, IoResizeOutline } from "react-icons/io5";
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
    <div className="w-full min-h-[80vh] bg-gradient-to-br from-primary via-primary to-secondary/20 flex justify-center py-16 px-4 sm:px-6 lg:px-8">
      {
        loadingState === "loading" &&
        <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-secondary/30 border-t-accent rounded-full animate-spin" />
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-accent/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
          </div>
          <p className="text-base text-text/60 font-semibold animate-pulse">Loading details...</p>
        </div>
      }
      {
        loadingState === "error" && (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 text-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg border-2 border-red-300/40">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-text mb-3">Failed to load product</h3>
            <p className="text-text/60 max-w-md leading-relaxed">We couldn't retrieve the product details. Please check your internet connection and try again.</p>
          </div>
        )
      }
      {
        loadingState === "loaded" &&
        <div className="bg-white/80 backdrop-blur-md w-full max-w-7xl rounded-[2rem] shadow-2xl shadow-secondary/20 overflow-hidden flex flex-col lg:flex-row border border-secondary/30">

          {/* Image Section */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-secondary/20 to-accent/5 p-6 lg:p-10 flex items-center justify-center min-h-[350px] lg:min-h-[600px]">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl bg-white border border-secondary/20">
              <ImageSlider images={product.image} />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-primary/30">

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-sm font-black tracking-wider uppercase mb-5 border border-accent/20 backdrop-blur-sm shadow-sm shadow-accent/10">
                <IoPricetagOutline className="text-base" />
                {product.category}
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-text leading-tight tracking-tight mb-5">
                {product.name}
              </h1>
              <p className="text-base lg:text-lg text-text/70 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-secondary/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs font-black text-text/50 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <IoResizeOutline className="text-accent" /> Dimensions
                </p>
                <p className="text-lg font-black text-text">{product.dimensions}</p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/30 border border-emerald-200/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs font-black text-emerald-700/60 uppercase tracking-widest mb-2">Availability</p>
                <p className="text-lg font-black text-emerald-600 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-md shadow-emerald-400/50" />
                  In Stock
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 border-t-2 border-secondary/30">
              <div className="flex flex-col">
                <span className="text-xs font-black text-text/40 uppercase tracking-widest mb-2">Price</span>
                <span className="text-5xl font-black text-accent">
                  <span className="text-2xl align-top mr-1">Rs.</span>
                  {product.price.toLocaleString()}
                </span>
              </div>

              <button
                className="flex-1 w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-accent to-accent/90 hover:from-accent hover:to-accent text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-accent/40 hover:shadow-2xl hover:shadow-accent/50 hover:-translate-y-1 hover:scale-105 active:scale-95 duration-300 flex items-center justify-center gap-3 group border border-accent/20"
                onClick={() => {
                  addToCart(product.key, 1);
                  console.log(loadCart());
                  toast.success("Added to cart", {
                    style: {
                      borderRadius: '16px',
                      background: '#112D4E',
                      color: '#fff',
                      fontWeight: 'bold',
                    },
                    iconTheme: {
                      primary: '#3F72AF',
                      secondary: '#fff',
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
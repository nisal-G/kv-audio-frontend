import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider"

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
        console.log( res.data)
      })
      .catch((error) => {
        console.error("Error fetching product data:", error)
        setLoadingState("error")
      })
  }, [key])




  return (
    <div className="w-full h-full flex justify-center">

      {
        loadingState === "loading" && 
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full"></div>
        </div>
      }
      {
        loadingState === "error" && <p>Error loading product data. Please try again later.</p>  
      }
      {
        loadingState === "loaded" && 
        <div className="w-full h-full flex items-center justify-center">

          <div className="w-[49%]  h-full"> <ImageSlider images={product.image} /> </div>

           <div className="w-[49%]  h-full flex flex-col items-center justify-center"> 
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <h2 className="text-2xl mb-4">Dimension: {product.dimensions}</h2>
            <h2 className="text-2xl mb-4">Category: {product.category}</h2>
            <h2 className="text-2xl mb-4">Price: Rs{product.price}</h2>
            <p className="text-lg">{product.description}</p>
           </div>
          
        </div>

      }

      
    </div>
  )
}
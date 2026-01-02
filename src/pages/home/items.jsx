import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
  const [state, setState] = useState("loading") //loading, success, error
  const [items, setItems] = useState([])

  useEffect(() => {

    if(state === "loading") {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get/`)
      .then(res => {
        setItems(res.data)
        setState("success")
        console.log(res.data)
      })
      .catch(error => {
        toast.error(error?.response?.data?.message || "Error fetching items: Contact Admin")
        setState("error")
      })
    }

  }, []);

  return (
    <div className="w-full h-full flex flex-wrap justify-center gap-4 pt-[50px] ">
      {
        state === "loading" && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[50px] h-[50px] border-t-green-400 animate-spin border-4 border-gray-300 rounded-full"></div>
          </div>
        )
      }
      {
        state === "success" && (
          items.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))
        )
      }
    </div>
  )
}

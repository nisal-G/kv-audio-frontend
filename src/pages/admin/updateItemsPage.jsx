import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateItemPage() {

  const location = useLocation();

  const [Key, setKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [category, setCategory] = useState(location.state.category);
  const [dimensions, setDimensions] = useState(location.state.dimensions);
  const [description, setDescription] = useState(location.state.description);

  const navigate = useNavigate();

  async function handleAddItem(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if(token) {
      try {
        const result = await axios.put(`http://localhost:3000/api/products/update/${Key}`, {
          name: productName,
          price: price,
          category: category,
          dimensions: dimensions,
          description: description
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        console.log("Backend response:", result.data);
        toast.success("Item added successfully!");
        navigate('/admin/items');
        
      } catch (error) {
        toast.error(error.response?.data?.error || "An error occurred while adding the item.");
      }
    } else {
      toast.error("You must be logged in to add an item.");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6  w-[500px] max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Item</h2>
        
        <form className="space-y-3">
          {/* Product Key */}
          <div>
            <label className="block text-gray-400 text-xs mb-1">Product Key</label>
            <input 
            disabled 
              type="text"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Product Key"
              value={Key}
              onChange={(e) => setKey(e.target.value)}  
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-gray-400 text-xs mb-1">Product Name</label>
            <input 
              type="text"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-400 text-xs mb-1">Price</label>
            <input 
              type="number"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-400 text-xs mb-1">Category</label>
            <select 
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="speakers">Speakers</option>
              <option value="headphones">Headphones</option>
              <option value="microphones">Microphones</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Product Dimensions */}
          <div>
            <label className="block text-gray-400 text-xs mb-1">Product Dimensions</label>
            <input 
              type="text"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Product Dimensions"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-gray-400 text-xs mb-1">Product Description</label>
            
            <textarea 
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
              rows="2"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button 
              onClick={handleAddItem}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Update
            </button>
            <button 
              type="button"
              onClick={() => navigate('/admin/items')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>            
  )
}


import axios from "axios";
import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (itemKey) => {
    console.log('Edit item:', itemKey);
    // TODO: Implement edit functionality
  };


  useEffect(() => {

    if(!itemsLoaded) {
      const token = localStorage.getItem('token');

      axios.get('http://localhost:3000/api/products/get', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
          setItems(response.data);
          setItemsLoaded(true);
      }).catch(error => {
        console.error('Error fetching items:', error);
      });
    }
  }, [itemsLoaded]);

  
  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:3000/api/products/delete/${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(
        (res) => {
          console.log(res.data);
          setItems(items.filter((item) => item.key !== key));
          setItemsLoaded(false);
        }
      ).catch(
        (err) => {
          console.error(err);
        }
      );
    }
  };
  

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your audio equipment inventory</p>
        </div>
        <Link to="/admin/addItems">
          <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
            <CiCirclePlus className="text-2xl" />
            <span className="font-semibold">Add New Item</span>
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {!itemsLoaded && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-24 h-24 rounded-full border-4 border-gray-200"></div>
              {/* Spinning gradient ring */}
              <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-amber-600 border-r-orange-500 animate-spin"></div>
            </div>
          </div>
        )}

        {itemsLoaded && <div className="overflow-x-auto">
          <table className="w-full"> 
            <thead>
              <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">Item Key</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Item Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price (LKR)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Dimensions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(items) && items.map((item, index) => (
                  <tr 
                    key={item.key} 
                    className={`border-b border-gray-200 hover:bg-amber-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{item.key}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.dimensions}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={item.description}>
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.availability 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.availability ? '✓ Available' : '✗ Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate('/admin/updateItems')}
                          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 transform hover:scale-110"
                          title="Edit item"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.key)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 transform hover:scale-110"
                          title="Delete item"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>}

        {/* Empty State */}
        {itemsLoaded && items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found. Add your first product!</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-gray-600 text-sm">
        Total Items: <span className="font-semibold text-amber-700">{items.length}</span>
      </div>
      
    </div>
  )
}

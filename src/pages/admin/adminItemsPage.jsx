const sampleArr = 
 [
  {
    "key": "SPK001",
    "name": "Portable Bluetooth Speaker",
    "price": 12500,
    "category": "Audio",
    "dimensions": "20 x 10 x 8 cm",
    "description": "High-quality portable Bluetooth speaker with deep bass and long battery life.",
    "availability": true,
    "image": [
      "https://example.com/images/speaker1.jpg",
      "https://example.com/images/speaker2.jpg"
    ]
  },
  {
    "key": "MIC002",
    "name": "Wireless Microphone",
    "price": 8500,
    "category": "Audio",
    "dimensions": "25 x 5 x 5 cm",
    "description": "Wireless microphone suitable for events, karaoke, and presentations.",
    "availability": true,
    "image": [
      "https://example.com/images/mic1.jpg"
    ]
  },
  {
    "key": "MIX003",
    "name": "Audio Mixer",
    "price": 32000,
    "category": "Studio Equipment",
    "dimensions": "40 x 30 x 10 cm",
    "description": "Professional audio mixer with multiple input channels and sound controls.",
    "availability": false,
    "image": []
  }
];

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
  const [items, setItems] = useState(sampleArr);
  
  return (
    <div className="w-full h-full bg-amber-50 relative">

      <div>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th>Item Key</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Dimensions</th>
              <th>Description</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item) => (
                <tr key={item.key}>
                  <td>{item.key}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.dimensions}</td>
                  <td>{item.description}</td>
                  <td>{item.availability ? 'Available' : 'Not Available'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>


      <div>
        <Link to="/admin/addItems">
        <CiCirclePlus className="text-4xl m-4 hover:text:bg-red-100 absolute right-2 bottom-1"/>
        </Link>
      </div>

      
    </div>
  )
}

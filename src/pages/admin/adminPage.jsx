import { Link, Route, Routes } from 'react-router-dom';
import { MdDashboard, MdBookmark, MdDevices, MdPerson } from 'react-icons/md';
import AdminItemsPage from './adminItemsPage';
import AddItemPage from './addItemPage';
import UpdateItemPage from './updateItemsPage';
import AdminUsersPage from './adminUsersPage';
import AdminOrdersPage from './adminBookingPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {

  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/get`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      const user = response.data;
      if (user.role === 'Admin') {
        setUserValidated(true);
      } else {
        window.location.href = '/login';
      }
    })
      .catch(error => {
        console.error('Error validating user:', error);
        window.location.href = '/login';
      });
  }, []);

  return (
    <div className="flex h-screen">
      <div className="bg-green-00 w-[300px] h-screen p-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2 mb-8 hover:opacity-80">
          <MdDashboard className="text-2xl" />
          <span className="text-xl font-semibold">Dashboard</span>
        </Link>
        <Link to="/admin/orders" className="flex items-center gap-2 mb-6 hover:opacity-80">
          <MdBookmark className="text-2xl" />
          <span className="text-xl font-semibold">Orders</span>
        </Link>
        <Link to="/admin/items" className="flex items-center gap-2 mb-6 hover:opacity-80">
          <MdDevices className="text-2xl" />
          <span className="text-xl font-semibold">Items</span>
        </Link>
        <Link to="/admin/users" className="flex items-center gap-2 mb-6 hover:opacity-80">
          <MdPerson className="text-2xl" />
          <span className="text-xl font-semibold">Users</span>
        </Link>
      </div>

      <div className="flex-1 h-screen bg-blue-100">
        {userValidated && (
          <Routes path="/*">
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/addItems" element={<AddItemPage />} />
            <Route path="/updateItems" element={<UpdateItemPage />} />
          </Routes>
        )}
      </div>
    </div>
  );

}


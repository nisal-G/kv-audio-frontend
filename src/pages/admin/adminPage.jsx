import { Link, Route, Routes } from 'react-router-dom';
import { MdDashboard, MdBookmark, MdDevices, MdPerson } from 'react-icons/md';
import AdminItemsPage from './adminItemsPage';
import AddItemPage from './addItemPage';
import UpdateItemPage from './updateItemsPage';

export default function AdminPage() {
  return (
    <div className="flex h-screen">
      <div className="bg-green-00 w-[300px] h-screen p-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2 mb-8 hover:opacity-80">
          <MdDashboard className="text-2xl" />
          <span className="text-xl font-semibold">Dashboard</span>
        </Link>
        <Link to="/admin/bookings" className="flex items-center gap-2 mb-6 hover:opacity-80">
          <MdBookmark className="text-2xl" />
          <span className="text-xl font-semibold">Bookings</span>
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
        <Routes>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} /> 
          <Route path="/bookings" element={<h1>Manage Bookings</h1>} />
          <Route path="/items" element={<AdminItemsPage />} />
          <Route path="/users" element={<h1>Manage Users</h1>} />
          <Route path="/addItems" element={<AddItemPage />} />
          <Route path="/updateItems" element={<UpdateItemPage />} />
        </Routes>
      </div>
    </div>
  );
}


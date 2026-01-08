import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('token');

        if(loading) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/get`,  {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log("Fetched orders:", response.data);
                setOrders(response.data);
                setLoading(false);

            }).catch(error => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Orders ({orders.length})</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-4 py-3 text-left">Order ID</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Order Date</th>
                                <th className="px-4 py-3 text-left">Start Date</th>
                                <th className="px-4 py-3 text-left">End Date</th>
                                <th className="px-4 py-3 text-left">Days</th>
                                <th className="px-4 py-3 text-left">Items</th>
                                <th className="px-4 py-3 text-left">Total</th>
                                <th className="px-4 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-semibold">{order.orderId}</td>
                                    <td className="px-4 py-3">{order.email}</td>
                                    <td className="px-4 py-3">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(order.startingDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(order.endingDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">{order.days}</td>
                                    <td className="px-4 py-3">
                                        <ul className="text-sm">
                                            {order.orderedItems.map((item) => (
                                                <li key={item._id}>
                                                    {item.product.name} (x{item.product.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-3 font-semibold">
                                        Rs. {order.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 rounded text-sm ${
                                            order.isApproved 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {order.isApproved ? 'Approved' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}


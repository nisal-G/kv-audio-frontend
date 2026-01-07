import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {

    const [cart, setCart] = useState(loadCart());
    const today = formatDate(new Date()); // Current date
    const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)); // Add one day in milliseconds
    
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [total, setTotal] = useState(0);

    // Recalculate total whenever startDate or endDate changes
    useEffect(() => {
        calculateTotal();
    }, [startDate, endDate]);


    // Reload cart items
    function reloadCart() {
        const cartInfo = loadCart();
        calculateTotal();
    }


    // Calculate total quote based on cart and dates
    function calculateTotal() {       
        const cartInfo = loadCart();        
        setCart(cartInfo);
        cartInfo.startingDate = startDate;
        cartInfo.endingDate = endDate;
        cartInfo.days = totalDays;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, 
           cartInfo 
        ).then((res) => {
            console.log("Quote fetched:", res.data);
            setTotal(res.data.total);
        }).catch((error) => {
            console.error("Error fetching quote:", error);
        });
    }


    // Handle booking creation
    function handleBookingCreation() {
        const cart = loadCart();
        cart.startingDate = startDate; // Set starting date
        cart.endingDate = endDate; // Set ending date
        cart.days = totalDays; // Set total days

        const token = localStorage.getItem("token");

        // Send booking creation request to backend
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, 
            cart,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }   
            }
        ).then((res) => { 
            console.log("Booking created successfully:", res.data);
            toast.success("Booking created successfully!");
        }).catch((error) => {
            console.error("Error creating booking:", error);
            toast.error("Error creating booking. Please try again.");
        });
    }



    // Calculate the number of days between start and end date
    function calculateDays() {
        if (!startDate || !endDate) return 0; // Return 0 if dates are not set
        const start = new Date(startDate); // Convert to Date object
        const end = new Date(endDate); // Convert to Date object
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return diffDays >= 0 ? diffDays : 0; // Ensure non-negative days
    }

    // Get total days for booking
    const totalDays = calculateDays();


    return (
        <div className="w-full h-full flex flex-col items-center px-4 py-6">
            {/* Date Selection Section */}
            <div className="w-full max-w-4xl mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Rental Period</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start Date Input */}
                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-sm font-semibold text-gray-700 mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={today}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700 bg-gray-50 hover:bg-white cursor-pointer"
                        />
                    </div>

                    {/* End Date Input */}
                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-sm font-semibold text-gray-700 mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate || today}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700 bg-gray-50 hover:bg-white cursor-pointer"
                        />
                    </div>
                </div>

                {/* Days Calculation Display */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Total Rental Duration:</span>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-blue-600">{totalDays}</span>
                            <span className="text-gray-600 font-medium">{totalDays === 1 ? 'day' : 'days'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Items Section */}
            <div className="w-full max-w-4xl flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 self-start">Your Items</h2>
                {
                    cart.orderedItems.map((item) => {
                        return (
                            // Render each booking item and pass reloadCart to refresh the cart when needed
                            <BookingItem key={item.key} itemKey={item.key} qty={item.qty} refresh={reloadCart} />
                        );
                    })
                }
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Total Quote: <span className="text-blue-600">Rs {total}</span></h2>
            </div>

            <div className="w-full flex justify-center">
                <button className="px-6 py-3 bg-accent text-white rounded hover:bg-accent-dark" onClick={handleBookingCreation}>Create Booking</button>

            </div>
        </div>
    )
}


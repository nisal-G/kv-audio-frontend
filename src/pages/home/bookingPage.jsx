import { useState } from "react";
import { loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";

export default function BookingPage() {

    const [cart, setCart] = useState(loadCart());

    function reloadCart() {
        setCart(loadCart());
    }


    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
                {
                    cart.orderedItems.map((item) => {
                        return (
                            // Render each booking item and pass reloadCart to refresh the cart when needed
                            <BookingItem key={item.key} itemKey={item.key} qty={item.qty} refresh={reloadCart} />
                        );
                    })
                }
            </div>
        </div>
    )
}


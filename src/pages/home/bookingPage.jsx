import { useState } from "react";
import { loadCart } from "../../utils/cart";

export default function BookingPage() {

    const [cart, setCart] = useState(loadCart());

    function reloadCart() {
        setCart(loadCart());
    }


    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
                {
                    cart.orderedItems.map((item) => (
                        <div key={item.key}>
                            <span>{item.key}</span> X
                            <span> {item.qty}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


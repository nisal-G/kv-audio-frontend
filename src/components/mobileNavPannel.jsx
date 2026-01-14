import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaHome, FaPhone, FaImages, FaBox, FaShoppingCart } from "react-icons/fa";

export default function MobileNavPannel(props) {

    const isOpen = props.isOpen;
    const setOpen = props.setOpen;

    const navLinks = [
        { to: "/home", label: "Home", icon: <FaHome /> },
        { to: "/contact", label: "Contact", icon: <FaPhone /> },
        { to: "/gallery", label: "Gallery", icon: <FaImages /> },
        { to: "/items", label: "Items", icon: <FaBox /> },
        { to: "/booking", label: "Cart", icon: <FaShoppingCart /> }
    ];

    return (
        <>
            {/* Backdrop Overlay */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
                    isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setOpen(false)}
            />

            {/* Navigation Panel */}
            <div 
                className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header Section */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-accent">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/KV_Audio_Logo.png" 
                            alt="KV Audio" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                        <h2 className="text-xl font-bold text-white">KV Audio</h2>
                    </div>
                    <button 
                        onClick={() => setOpen(false)}
                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                        aria-label="Close menu"
                    >
                        <IoClose size={28} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col p-4">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-4 px-4 py-4 text-gray-700 hover:bg-accent hover:text-white rounded-lg transition-all duration-200 group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                                {link.icon}
                            </span>
                            <span className="text-lg font-medium">{link.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="absolute bottom-0 w-full p-6 border-t border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-600 text-center">
                        © 2026 KV Audio
                    </p>
                </div>
            </div>
        </>
    )
}



import { Link, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaHome, FaPhone, FaImages, FaBox, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function MobileNavPannel(props) {

    const isOpen = props.isOpen;
    const setOpen = props.setOpen;
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    // Check authentication status
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");
            setIsAuthenticated(!!token);
            setUserEmail(email || "");
        };

        // Check on mount and when panel opens
        checkAuth();

        // Listen for storage changes
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, [isOpen]);

    // Extract first name from email (before @)
    const getUserDisplayName = () => {
        if (!userEmail) return "";
        const name = userEmail.split("@")[0];
        // Capitalize first letter and replace dots/underscores with spaces
        return name.charAt(0).toUpperCase() + name.slice(1).replace(/[._]/g, " ");
    };

    const navLinks = [
        { to: "/home", label: "Home", icon: <FaHome /> },
        { to: "/about", label: "About Us", icon: <FaInfoCircle /> },
        { to: "/contact", label: "Contact", icon: <FaPhone /> },
        { to: "/items", label: "Items", icon: <FaBox /> },
        { to: "/booking", label: "Cart", icon: <FaShoppingCart /> }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* Navigation Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-[300px] bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl z-50 transform transition-all duration-500 ease-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
            >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 pointer-events-none"></div>

                {/* Header Section */}
                <div className="relative flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-accent via-accent/98 to-accent/95 shadow-lg">
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="relative">
                            {/* Glow behind logo */}
                            <div className="absolute inset-0 bg-white/30 rounded-full blur-md"></div>
                            <img
                                src="/KV_Audio_Logo.png"
                                alt="KV Audio"
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg relative z-10"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white drop-shadow-md">KV Audio</h2>
                            <p className="text-xs text-white/80">Premium Audio Gear</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="relative z-10 text-white hover:bg-white/20 p-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:rotate-90 active:scale-95"
                        aria-label="Close menu"
                    >
                        <IoClose size={26} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col p-5 gap-1 relative">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className={`relative flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group overflow-hidden ${isActive(link.to)
                                ? 'bg-gradient-to-r from-accent to-accent/90 text-white shadow-lg shadow-accent/30'
                                : 'text-gray-700 hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent/5'
                                }`}
                        >
                            {/* Background shimmer effect */}
                            {!isActive(link.to) && (
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                            )}

                            <span className={`text-xl transition-all duration-300 relative z-10 ${isActive(link.to)
                                ? 'scale-110 drop-shadow-lg'
                                : 'group-hover:scale-110'
                                }`}>
                                {link.icon}
                            </span>

                            <span className={`text-base font-semibold relative z-10 ${isActive(link.to) ? 'drop-shadow-sm' : ''
                                }`}>
                                {link.label}
                            </span>

                            {/* Active indicator */}
                            {isActive(link.to) && (
                                <span className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></span>
                            )}
                        </Link>
                    ))}

                    {/* Auth Button */}
                    {isAuthenticated ? (
                        // User Profile Card with Logout (if logged in)
                        <div className="relative flex flex-col gap-3 px-5 py-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl mt-3 shadow-lg overflow-hidden">
                            {/* User Info Section */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg ring-4 ring-white">
                                    <span className="text-white font-bold text-2xl">
                                        {getUserDisplayName().charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-900 font-bold text-base truncate">
                                        {getUserDisplayName()}
                                    </p>
                                    <p className="text-gray-500 text-sm truncate max-w-[180px]">
                                        {userEmail}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                            {/* Logout Button */}
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("email");
                                    window.location.href = "/login";
                                }}
                                className="relative flex items-center justify-center gap-3 px-5 py-3 text-gray-700 hover:text-red-600 bg-gray-100 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-xl transition-all duration-300 active:scale-95 group"
                            >
                                <IoLogOutOutline className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                                <span className="text-sm font-semibold">Logout</span>
                            </button>
                        </div>
                    ) : (
                        // Login Button (if not logged in)
                        <Link
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="relative flex items-center gap-4 px-5 py-4 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 mt-3 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 group overflow-hidden"
                        >
                            {/* Shine effect */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                            <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-base font-semibold relative z-10">Login</span>
                        </Link>
                    )}
                </nav>

                {/* Footer Section */}
                <div className="absolute bottom-0 w-full p-6 border-t border-gray-200/50 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2 font-medium">
                            Professional Audio Equipment Rental
                        </p>
                        <p className="text-xs text-gray-400">
                            © 2026 KV Audio
                        </p>
                    </div>

                    {/* Decorative dots */}
                    <div className="flex justify-center gap-1.5 mt-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    </div>
                </div>
            </div>
        </>
    )
}



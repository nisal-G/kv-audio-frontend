import { Link, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import MobileNavPannel from "./mobileNavPannel";

export default function Header() {
  const [navPannelOpen, setNavPannelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Check authentication status on mount and storage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Initial check
    checkAuth();

    // Listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/gallery", label: "Gallery" },
    { to: "/items", label: "Items" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${isScrolled
        ? "h-16 bg-gradient-to-r from-accent via-accent/98 to-accent backdrop-blur-xl shadow-2xl shadow-accent/20"
        : "h-20 bg-gradient-to-r from-accent/95 via-accent/93 to-accent/95 backdrop-blur-lg shadow-lg shadow-accent/10"
        }`}
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">

        {/* Logo Section */}
        <Link
          to="/home"
          className="flex items-center gap-3 group z-10 relative"
        >
          <div className="relative">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 blur-xl transition-all duration-500 scale-0 group-hover:scale-150"></div>

            <img
              src="/KV_Audio_Logo.png"
              alt="KV Audio Logo"
              className={`object-cover rounded-full border-2 border-white/30 shadow-xl shadow-black/20 transition-all duration-500 group-hover:scale-110 group-hover:border-white/60 group-hover:shadow-2xl group-hover:shadow-white/20 relative z-10 ${isScrolled ? "w-12 h-12" : "w-16 h-16"
                }`}
            />

            {/* Subtle gradient overlay on logo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/0 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          <div className="hidden sm:block">
            <span className="text-white font-bold text-xl sm:text-2xl tracking-wide group-hover:tracking-wider transition-all duration-300 drop-shadow-lg">
              KV Audio
            </span>
            <div className="h-0.5 w-0 group-hover:w-full bg-white/50 transition-all duration-300 rounded-full mt-0.5"></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 lg:px-6 py-2.5 text-base lg:text-lg font-semibold transition-all duration-300 rounded-xl group overflow-hidden ${isActive(link.to)
                ? "text-white"
                : "text-white/85 hover:text-white"
                }`}
            >
              {/* Background layer */}
              <span
                className={`absolute inset-0 bg-white/15 backdrop-blur-sm rounded-xl transition-all duration-300 ${isActive(link.to)
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                  }`}
              ></span>

              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </span>

              <span className="relative z-10 drop-shadow-sm">{link.label}</span>

              {/* Active indicator - animated underline */}
              {isActive(link.to) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-lg shadow-white/50 animate-pulse"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section - Auth Buttons, Cart & Menu */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Auth Buttons - Desktop */}
          {isAuthenticated ? (
            // Logout Button (if logged in)
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl font-medium text-sm lg:text-base transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 group"
              aria-label="Logout"
            >
              <IoLogOutOutline className="text-lg lg:text-xl group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          ) : (
            // Login Button (if not logged in)
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 text-white bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-white/10 backdrop-blur-sm border border-white/30 hover:border-white/50 group"
              aria-label="Login"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="hidden lg:inline">Login</span>
            </Link>
          )}

          {/* Cart Icon - Desktop */}
          <Link
            to="/booking"
            className="hidden md:flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 text-white bg-white/15 backdrop-blur-sm rounded-xl hover:bg-white/25 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/20 border border-white/20 hover:border-white/40 group relative overflow-hidden"
            aria-label="View cart"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></span>
            </span>
            <FaCartShopping className="text-lg lg:text-xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </Link>

          {/* Cart Icon - Mobile */}
          <Link
            to="/booking"
            className="md:hidden flex items-center justify-center w-11 h-11 text-white bg-white/15 backdrop-blur-sm rounded-xl active:scale-95 transition-all duration-200 shadow-lg border border-white/20"
            aria-label="View cart"
          >
            <FaCartShopping className="text-lg" />
          </Link>

          {/* Hamburger Menu - Mobile */}
          <button
            onClick={() => setNavPannelOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-white bg-white/15 backdrop-blur-sm rounded-xl active:scale-95 transition-all duration-200 shadow-lg border border-white/20 group"
            aria-label="Open menu"
          >
            <GiHamburgerMenu className="text-xl group-active:rotate-90 transition-transform duration-300" />
          </button>

        </div>
      </div>

      <MobileNavPannel isOpen={navPannelOpen} setOpen={setNavPannelOpen} />
    </header>
  );
}

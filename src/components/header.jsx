import { Link, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import MobileNavPannel from "./mobileNavPannel";

export default function Header() {
  const [navPannelOpen, setNavPannelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "h-16 bg-accent/95 backdrop-blur-md shadow-lg" 
          : "h-20 bg-accent/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link 
          to="/home" 
          className="flex items-center gap-3 group z-10"
        >
          <div className="relative">
            <img 
              src="/KV_Audio_Logo.png" 
              alt="KV Audio Logo" 
              className={`object-cover rounded-full border-2 border-white/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-xl ${
                isScrolled ? "w-12 h-12" : "w-16 h-16"
              }`}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-white font-bold text-xl sm:text-2xl tracking-wide hidden sm:block group-hover:text-white/90 transition-colors duration-200">
            KV Audio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 lg:px-6 py-2 text-base lg:text-lg font-semibold transition-all duration-300 rounded-lg group ${
                isActive(link.to)
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              <span 
                className={`absolute inset-0 bg-white/10 rounded-lg transition-all duration-300 ${
                  isActive(link.to)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                }`}
              ></span>
              {isActive(link.to) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section - Cart & Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Icon - Desktop */}
          <Link
            to="/booking"
            className="hidden md:flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 text-white bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="View cart"
          >
            <FaCartShopping className="text-lg lg:text-xl" />
          </Link>

          {/* Cart Icon - Mobile */}
          <Link
            to="/booking"
            className="md:hidden flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full hover:bg-white/20 active:scale-95 transition-all duration-200 shadow-md"
            aria-label="View cart"
          >
            <FaCartShopping className="text-lg" />
          </Link>

          {/* Hamburger Menu - Mobile */}
          <button
            onClick={() => setNavPannelOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full hover:bg-white/20 active:scale-95 transition-all duration-200 shadow-md"
            aria-label="Open menu"
          >
            <GiHamburgerMenu className="text-xl" />
          </button>

          {token !== null && <button className="hidden md:block absolute top-4 right-4 " onClick={() => { localStorage.removeItem("token"); 
            window.location.href = "/login"; }}>
            logout
          </button>}

        </div>
      </div>

      <MobileNavPannel isOpen={navPannelOpen} setOpen={setNavPannelOpen} />
    </header>
  );
}
import { Link } from "react-router-dom";
import Home from "../pages/home/homePage";

export default function Header() {
  return (
    <header className="w-full h-16 text-black flex justify-center items-center px-4 relative">

      <img src="/KV_Audio_Logo.png" alt="KV Audio Logo" className="w-[100px] h-[60px] object-cover absolute left-4 border-1 border-amber-100 rounded-full"/>
      <Link to="/home"className="text-[25px] font-bold m-1"> Home</Link>
      <Link to="/contact"className="text-[25px] font-bold m-1">Contact</Link>
      <Link to="/gallery"className="text-[25px] font-bold m-1">Gallery</Link>
      <Link to="/items"className="text-[25px] font-bold m-1">Items</Link>
      
    </header>
  );
}
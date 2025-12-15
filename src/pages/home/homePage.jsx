import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contactUs";
import Home from "./home";
import Gallery from "./gallery";
import Items from "./items";

export default function HomePage() {
    return (    
        <div className="w-full h-screen flex flex-col items-center">
            <Header />
            <div className="w-full h-[calc(100vh-4px)] bg-gray-200 ">
                <Routes path="/*">
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/items" element={<Items />} />
                </Routes>
                
            </div>
        </div>
    )
}
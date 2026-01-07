import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contactUs";
import Home from "./home";
import Gallery from "./gallery";
import Items from "./items";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";

export default function HomePage() {
    return (    
        <div className="w-full h-screen flex flex-col items-center">
            <Header />
            <div className="w-full h-[calc(100vh-4px) ">
                <Routes path="/*">
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/items" element={<Items />} />
                    <Route path= "/product/:key" element={<ProductOverview />} />
                    <Route path= "/booking" element={<BookingPage />} />
                    <Route path="/*" element={< ErrorNotFound />} />
                </Routes>
                
            </div>
        </div>
    )
}
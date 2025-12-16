import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import Login from "./login/login";
import { Toaster } from "react-hot-toast";
import AdminPage from "./pages/admin/adminPage";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios.post(`${backendUrl}/api/users/logging`, { email, password })
      .then(response => {
        toast.success("Login successful!");

        const user = response.data.user;
        localStorage.setItem("token", response.data.token);

        if (user.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch(error => { 
        console.error("Login failed:", error);
        toast.error(error.response.data.error || "Login failed. Please try again.");});

  };

  return (
    <div 
      className="w-full h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Login_bg_Image.jpg')" }}
    >
      <div className="w-[400px] min-h-[500px] backdrop-blur-2xl bg-white/30 rounded-lg shadow-2xl flex flex-col justify-center items-center p-8 relative">
        <img 
          src="/KV_Audio_Logo.png" 
          alt="KV Audio Logo" 
          className="w-[150px] h-[90px] object-cover mb-8"
        />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:text-blue-800 font-medium">
              Forgot Password?
            </a>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-700">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}


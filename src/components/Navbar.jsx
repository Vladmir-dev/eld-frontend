// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../services/auth";
import { Truck, LogOut, LayoutList } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-700 shadow-xl py-3 px-6 sm:px-12 flex justify-between items-center sticky top-0 z-20">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-2">
        <Truck className="h-6 w-6 text-teal-300" />
        <h1 className="text-2xl font-extrabold tracking-wider text-white">
          {isAuthenticated() ? "ELD Tracker" : ""}
        </h1>
      </div>
      
      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {isAuthenticated() ? (
          <>
            {/* Trips Link */}
            <Link
              to="/trips"
              className="text-gray-200 flex items-center space-x-1.5 font-medium hover:text-white transition duration-150"
            >
              <LayoutList className="h-4 w-4" />
              <span>Trips</span>
            </Link>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              // Enhanced logout styling: clear red signal, smooth hover
              className="flex items-center space-x-1.5 text-red-500 hover:text-red-100 font-semibold transition duration-150 p-2 rounded-lg hover:bg-indigo-600/50"
            >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </button>
          </>
        ) : (
            // You can uncomment this if you ever need a link on the unauthenticated page
            // <Link to="/login" className="text-white hover:text-teal-300 transition duration-150">Login</Link>
            <></>
        )}
      </div>
    </nav>
  );
}

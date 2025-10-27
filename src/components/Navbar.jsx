// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../services/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-600">ELD Tracker</h1>
      <div className="flex space-x-4">
        {isAuthenticated() ? (
          <>
            <Link to="/trips" className="hover:text-blue-600">
              Trips
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

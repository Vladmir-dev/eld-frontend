// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import TripsPage from "./pages/TripsPage";
import LogsPage from "./pages/LogsPage";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 m-0 p-0">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/trips"
              element={
                <PrivateRoute>
                  <TripsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/trips/:id/logs"
              element={
                <PrivateRoute>
                  <LogsPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

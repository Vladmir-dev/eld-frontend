import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(login(form));
    try {
      // 1. Dispatch the login thunk
      const resultAction = await dispatch(login(form));

      // 2. unwrapResult will throw an error if the thunk was rejected
      //    If it succeeds, execution continues here.
      unwrapResult(resultAction);

      // 3. SUCCESS: Redirect to the /trips page
      navigate("/trips");
    } catch (err) {
      // FAILURE: Handle the error (e.g., display an error message)
      console.error("Login failed:", err);
      // You can dispatch a notification or set a local error state here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 p-4">
      {/* Background Gradient/Layering */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-teal-500/10 opacity-70"></div>

      <form
        onSubmit={handleSubmit}
        // Enhanced styling: richer shadow, lighter background, rounded corners
        className="relative z-10 bg-white p-8 sm:p-10 shadow-2xl rounded-2xl w-full max-w-sm border border-gray-100 transform transition-all duration-300 hover:shadow-3xl"
      >
        {/* Logo/Icon Area */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 mb-2 bg-indigo-600 rounded-full shadow-lg">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Driver Log</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage your trips
          </p>
        </div>

        {/* Input Fields with Labels */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              // Better focus state and subtle border for depth
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          // Stronger color, full-width, better padding, and smooth hover effect
          className="mt-6 bg-indigo-600 text-white w-full py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg disabled:bg-indigo-400"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing In...
            </span>
          ) : (
            "Login"
          )}
        </button>

        {/* Optional Footer/Error Message */}
        {status === "error" && (
          <p className="text-red-500 text-sm text-center mt-3">
            Invalid credentials. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;

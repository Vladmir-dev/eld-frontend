import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
      navigate('/trips'); 

    } catch (err) {
      // FAILURE: Handle the error (e.g., display an error message)
      console.error('Login failed:', err);
      // You can dispatch a notification or set a local error state here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Driver Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          {status === 'loading' ? 'Loading...':'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

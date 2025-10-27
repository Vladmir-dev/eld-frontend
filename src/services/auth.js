// src/services/auth.js
import api from "./api";

export const loginUser = async (email, password) => {
  const response = await api.post("auth/token/", { email, password });
  const { access, refresh } = response.data;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access");
};

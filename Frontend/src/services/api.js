import axios from "axios";

console.log("ENV:", import.meta.env);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("BASE URL:", baseURL);
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("campusfix_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("campusfix_token");
      localStorage.removeItem("campusfix_user");
    }

    return Promise.reject(error);
  },
);

export default api;

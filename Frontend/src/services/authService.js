import api from "./api";

export const authService = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  logout: () => {
    localStorage.removeItem("campusfix_token");
    localStorage.removeItem("campusfix_user");
  },
  getCurrentUser: () => {
    const user = localStorage.getItem("campusfix_user");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;

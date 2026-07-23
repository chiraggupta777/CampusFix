import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("campusfix_token") || null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (payload) => {
    const response = await authService.login(payload);
    const { token: authToken, user: authUser } = response.data;

    localStorage.setItem("campusfix_token", authToken);
    localStorage.setItem("campusfix_user", JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);

    return response;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    const { user: authUser } = response.data;

    if (authUser) {
      localStorage.setItem("campusfix_user", JSON.stringify(authUser));
      setUser(authUser);
    }

    return response;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, login, logout, register, loading }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

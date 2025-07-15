import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const fakeAuthService = {
  login({ role }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { id: "user-1", name: "John Doe", role };
        resolve(user);
      }, 1000);
    });
  },
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check previously authenticated user
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (role) => {
    const user = await fakeAuthService.login({ role });
    setUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const logout = async () => {
    await fakeAuthService.logout();
    setUser(null);
    localStorage.removeItem("authUser");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};


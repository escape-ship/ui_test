import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("loggedIn", String(isLoggedIn));
  }, [isLoggedIn]);

  async function login(email: string, password: string) {
    if (res.ok) {
      setIsLoggedIn(true);
      return;
    if (res.status === 401) {
      throw new Error("password");
    }
    throw new Error("server");
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error("Invalid credentials");
    }
    setIsLoggedIn(true);
  }
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

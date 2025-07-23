import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { config } from "@/lib/config";

type AuthContextValue = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  socialLogin: () => void;
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
    console.log(`🔐 [Auth] Login attempt to: ${config.BACKEND_URL}/login`);
    const res = await fetch(`${config.BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(`📡 [Auth] Login response status: ${res.status}`);
    if (res.ok) {
      console.log(`✅ [Auth] Login successful`);
      setIsLoggedIn(true);
      return;
    }
    if (res.status === 401) {
      console.log(`❌ [Auth] Invalid credentials`);
      throw new Error("password");
    }
    console.log(`❌ [Auth] Server error`);
    throw new Error("server");
  }
  const logout = () => setIsLoggedIn(false);

  function socialLogin() {
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, socialLogin }}>
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

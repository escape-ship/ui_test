import { createContext, useContext, useEffect, useState, ReactNode } from "react";

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
    const res = await fetch("http://localhost:8081/oauth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setIsLoggedIn(true);
      return;
    }
    if (res.status === 401) {
      throw new Error("password");
    }
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

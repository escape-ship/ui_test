import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const USE_MOCK = process.env.BUN_PUBLIC_MOCK_AUTH === "true";

type AuthContextValue = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
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
    if (USE_MOCK) {
      const stored = localStorage.getItem("mock-user");
      if (stored) {
        const user = JSON.parse(stored) as { email: string; password: string };
        if (user.email === email && user.password === password) {
          setIsLoggedIn(true);
          return;
        }
        throw new Error("password");
      }
      if (password === "password") {
        setIsLoggedIn(true);
        return;
      }
      throw new Error("password");
    }
    const res = await fetch("http://0.0.0.0:8081/login", {
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

  async function register(email: string, password: string) {
    if (USE_MOCK) {
      localStorage.setItem("mock-user", JSON.stringify({ email, password }));
      return;
    }
    await fetch("http://0.0.0.0:8081/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  }
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
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

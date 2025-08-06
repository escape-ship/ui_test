import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { config } from "@/lib/config";

type User = {
  id: string;
  email: string;
  name?: string;
  token?: string;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  socialLogin: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // 초기화 로직을 더 안전하게 처리
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    console.log(`🔄 [Auth] Initial loggedIn state:`, loggedIn);
    return loggedIn;
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    console.log(`🔄 [Auth] Initial user state:`, parsedUser);
    return parsedUser;
  });

  const [token, setToken] = useState<string | null>(() => {
    // 먼저 별도 저장된 토큰을 확인하고, 없으면 user 객체에서 토큰을 가져옴
    const savedToken = localStorage.getItem("authToken");
    console.log(`🔄 [Auth] Initial authToken from localStorage:`, savedToken);
    
    if (savedToken) {
      console.log(`🔄 [Auth] Using saved token`);
      return savedToken;
    }
    
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const userToken = parsedUser.token || null;
      console.log(`🔄 [Auth] Token from user object:`, userToken);
      return userToken;
    }
    
    console.log(`🔄 [Auth] No token found`);
    return null;
  });

  useEffect(() => {
    localStorage.setItem("loggedIn", String(isLoggedIn));
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [isLoggedIn, user, token]);

  async function login(email: string, password: string) {
    console.log(`🔐 [Auth] Login attempt to: ${config.BACKEND_URL}/login`);
    const res = await fetch(`${config.BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(`📡 [Auth] Login response status: ${res.status}`);
    if (res.ok) {
      const userData = await res.json();
      console.log(`✅ [Auth] Login successful - Full response:`, userData);
      
      // 서버에서 토큰과 사용자 정보를 받아서 저장
      const userToken = userData.token || userData.accessToken || userData.access_token || `temp_token_${Date.now()}`;
      console.log(`🔑 [Auth] Token received:`, userToken ? 'Yes' : 'No');
      console.log(`🔑 [Auth] Token value:`, userToken);
      console.log(`🔑 [Auth] Token length:`, userToken?.length);
      console.log(`🔑 [Auth] Is temp token:`, userToken?.startsWith('temp_token_'));
      
      // 먼저 토큰을 설정
      setToken(userToken);
      
      // 그 다음 사용자 정보 설정
      const newUser = {
        id: userData.id || userData.userId || userData.user_id || email,
        email: email,
        name: userData.name || userData.username || "",
        token: userToken
      };
      setUser(newUser);
      
      // 마지막에 로그인 상태 설정
      setIsLoggedIn(true);
      
      console.log(`👤 [Auth] User set:`, newUser);
      console.log(`💾 [Auth] Saving to localStorage - authToken:`, userToken);
      return;
    }
    if (res.status === 401) {
      console.log(`❌ [Auth] Invalid credentials`);
      throw new Error("password");
    }
    console.log(`❌ [Auth] Server error`);
    throw new Error("server");
  }
  
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  function socialLogin() {
    setIsLoggedIn(true);
    // 소셜 로그인 시 임시 사용자 정보 (실제로는 서버에서 받아와야 함)
    const tempToken = `social_token_${Date.now()}`;
    setToken(tempToken);
    setUser({
      id: `social_${Date.now()}`,
      email: "social@example.com",
      name: "Social User",
      token: tempToken
    });
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, socialLogin }}>
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

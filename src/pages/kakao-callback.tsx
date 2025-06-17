import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function KakaoCallbackPage() {
  const navigate = useNavigate();
  const { socialLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    async function handleAuth() {
      if (!code) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:8081/oauth/kakao/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, scope: "account_email profile_image" }),
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem(
            "userInfoJson",
            JSON.stringify(data.userInfoJson)
          );
          socialLogin();
          navigate("/");
        } else {
          alert("Kakao login failed");
          navigate("/login");
        }
      } catch {
        alert("Kakao login failed");
        navigate("/login");
      }
    }

    handleAuth();
  }, [navigate, socialLogin]);

  return <p>Processing Kakao login...</p>;
}

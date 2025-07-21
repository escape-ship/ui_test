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
        if (window.opener) {
          window.opener.postMessage(
            { type: "KAKAO_LOGIN_RESULT", success: false },
            "*"
          );
        }
        return;
      }
      try {
        const res = await fetch("http://localhost:8080/oauth/kakao/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, scope: "account_email profile_image" }),
        });
        if (res.ok) {
          const data = await res.json();
          // accessToken 등 필수 값이 없으면 실패로 간주
          if (data.accessToken && data.refreshToken && data.userInfoJson && window.opener) {
            window.opener.postMessage(
              {
                type: "KAKAO_LOGIN_RESULT",
                success: true,
                tokens: {
                  accessToken: data.accessToken,
                  refreshToken: data.refreshToken,
                  userInfoJson: data.userInfoJson,
                },
              },
              "*"
            );
            window.close();
          } else if (window.opener) {
            window.opener.postMessage(
              { type: "KAKAO_LOGIN_RESULT", success: false },
              "*"
            );
          }
        } else {
          if (window.opener) {
            window.opener.postMessage(
              { type: "KAKAO_LOGIN_RESULT", success: false },
              "*"
            );
          }
        }
      } catch {
        if (window.opener) {
          window.opener.postMessage(
            { type: "KAKAO_LOGIN_RESULT", success: false },
            "*"
          );
        }
      }
    }

    handleAuth();
  }, [navigate, socialLogin]);

  return <p>Processing Kakao login...</p>;
}

// Environment configuration
export const config = {
  // Backend API - Use localhost for browser access
  BACKEND_URL: "http://localhost:8080",
  
  // Kakao OAuth
  KAKAO_CLIENT_ID: "71ed6e032e6da04b28061253ea908b1c",
  KAKAO_REDIRECT_URI: "http://localhost:3000/callback",

} as const;

// Legacy exports for backward compatibility
export const KAKAO_CLIENT_ID = config.KAKAO_CLIENT_ID;
export const KAKAO_REDIRECT_URI = config.KAKAO_REDIRECT_URI;
export const BACKEND_URL = config.BACKEND_URL;

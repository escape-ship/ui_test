import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p>This is your profile page.</p>
      <Button onClick={handleLogout} className="mt-4">Logout</Button>
    </div>
  );
}

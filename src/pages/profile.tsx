import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { logout } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p>This is your profile page.</p>
      <Button onClick={logout} className="mt-4">Logout</Button>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const handleLogout = async () => {
    await logout();
    setAccessToken(null);
    navigate("/login");
    console.log("Logged out, go to /");
  };
  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      <nav>
        <Link to="/profile">Profile</Link> |
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

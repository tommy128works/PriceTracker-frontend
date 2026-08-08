import { Link, useNavigate } from "react-router-dom";
import "./AppHeader.css";
import { logout } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function AppHeader() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const handleLogout = async () => {
    await logout();
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <header className="app-header">
      <nav className="app-header__nav">
        <Link className="app-header__logo" to="/dashboard">
          Price Tracker
        </Link>

        <div className="app-header__links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/deal-lists">Deal Lists</Link>
        </div>

        <button
          type="button"
          className="app-header__logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

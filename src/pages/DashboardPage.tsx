import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      <nav>
        <Link to="/profile">Profile</Link> | <Link to="/logout">Logout</Link>
      </nav>
    </div>
  );
}

import { Link } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <div>
        <h1>Welcome to Price Tracker</h1>
        <p>Please login or register to continue:</p>

        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </>
  );
}

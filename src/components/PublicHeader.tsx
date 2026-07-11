import { Link } from "react-router-dom";
import "./PublicHeader.css";

export default function PublicHeader() {
  return (
    <header className="public-header">
      <nav className="public-header__nav">
        <Link className="public-header__logo" to="/">
          Price Tracker
        </Link>

        <div className="public-header__links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
}

import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Price Tracker</h1>
      <p>Please login or register to continue:</p>

      <div style={{ marginTop: "20px" }}>
        <Link
          to="/login"
          style={{
            marginRight: "20px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

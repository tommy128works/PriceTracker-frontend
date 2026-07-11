import { useState } from "react";
import { register } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await register(firstName, lastName, email, password);
      navigate("/");
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <>
      <PublicHeader />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {error && <p>{error}</p>}

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">{"Register"}</button>

          <p style={{ marginTop: "10px" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

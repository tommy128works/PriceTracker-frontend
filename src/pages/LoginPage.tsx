import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PublicHeader from "../components/PublicHeader";

export default function LoginPage() {
  const { setAccessToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      setAccessToken(res.data.accessToken);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <PublicHeader />
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {error && <p>{error}</p>}
      </div>
    </>
  );
}

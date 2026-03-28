import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const { accessToken, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

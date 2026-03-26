import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  accessToken: string | null;
};

export default function ProtectedRoute({ children, accessToken }: Props) {
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
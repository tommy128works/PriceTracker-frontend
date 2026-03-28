import { createContext, useEffect, useRef, useState } from "react";
import { api, setAccessToken as setApiToken } from "../api/client";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const refresh = async () => {
      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );
        const newToken = res.data.accessToken;
        setAccessToken(newToken);
        setApiToken(newToken);
      } catch {
        setAccessToken(null);
        setApiToken(null);
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

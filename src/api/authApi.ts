import { api, setAccessToken } from "./client";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  setAccessToken(res.data.accessToken);
  return res;
};

export const logout = async () => {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
  } finally {
    setAccessToken(null);
  }
};

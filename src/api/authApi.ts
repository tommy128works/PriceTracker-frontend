import { api, setAccessToken } from "./client";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  setAccessToken(res.data.accessToken);
};

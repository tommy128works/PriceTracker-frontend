import { api, setAccessToken } from "./client";

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const res = await api.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });

  return res.data;
};

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

import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          { withCredentials: true },
        );
        console.log("Token refreshed");
        setAccessToken(refreshRes.data.accessToken);
        error.config.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

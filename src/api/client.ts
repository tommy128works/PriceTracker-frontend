import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
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
        const originalRequest = error.config;
        if (originalRequest.url.includes("/auth/refresh")) {
          return Promise.reject(error);
        }
        const refreshRes = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );
        const newToken = refreshRes.data.accessToken;
        setAccessToken(newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

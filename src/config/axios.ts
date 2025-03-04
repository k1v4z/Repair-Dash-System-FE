import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      // Network error or CORS issue
      const networkError = error as Error;
      console.error("Network Error or CORS issue:", networkError.message);
      return Promise.reject(
        new Error(
          "Unable to connect to the server. Please check your connection."
        )
      );
    }

    return Promise.reject(error);
  }
);

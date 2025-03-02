import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
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
      console.error("Network Error or CORS issue:", error.message);

      // More detailed error information for debugging
      if (error.request) {
        console.error(
          "Request was made but no response received",
          error.request
        );
      } else {
        console.error("Error setting up the request", error.message);
      }

      return Promise.reject(
        new Error(
          "Unable to connect to the server. Please check your connection or CORS configuration."
        )
      );
    }

    const status = error.response.status;

    switch (status) {
      case 401:
        // Unauthorized - redirect to login
        window.location.href = "/login";
        break;
      case 403:
        // Forbidden - redirect to forbidden page
        window.location.href = "/forbidden";
        break;
      case 0: // CORS error often results in status 0
        console.error("CORS Error:", error.message);
        return Promise.reject(
          new Error(
            "Cross-Origin Request Blocked. Please check CORS configuration."
          )
        );
    }

    return Promise.reject(error);
  }
);

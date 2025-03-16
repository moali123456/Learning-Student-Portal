import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL:
    "https://sah-platform-api-egghayfcc4ddeuae.canadacentral-01.azurewebsites.net/api/", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization Token to Requests
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Custom Base Query using Axios
const axiosBaseQuery =
  (): BaseQueryFn<
    { url: string; method: string; data?: unknown; params?: unknown },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || "Something went wrong",
        },
      };
    }
  };

export default axiosBaseQuery;

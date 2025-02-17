import { AxiosResponse } from "axios";
import { axiosInstance } from "../config/axios";

export class ApiService {
  static async get<T>(url: string, params?: object): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data?: object): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data);
    return response.data;
  }

  static async put<T>(url: string, data?: object): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data);
    return response.data;
  }

  static async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.delete(url);
    return response.data;
  }
}

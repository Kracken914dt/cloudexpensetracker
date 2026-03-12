import { AxiosRequestConfig } from "axios";
import { baseApi } from "./BaseApi";
import { handleApiError } from "./ErrorHandler";

export class ApiService {
  static async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await baseApi.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  static async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await baseApi.post<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  static async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await baseApi.put<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  static async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await baseApi.patch<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  static async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await baseApi.delete<T>(endpoint, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

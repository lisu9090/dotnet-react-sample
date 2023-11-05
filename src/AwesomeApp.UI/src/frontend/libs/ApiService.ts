import axios, { AxiosInstance } from "axios";
import { frontendConfig } from "../config";

export class ApiService {
  constructor(private readonly axiosClient: AxiosInstance) { }


}

export async function createApiService(): Promise<ApiService> {
  const { apiConfig } = await frontendConfig

  const axiosInstance = axios.create({
    baseURL: apiConfig.baseUrl
  })

  return new ApiService(axiosInstance)
}
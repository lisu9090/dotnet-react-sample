import axios from "axios"
import { BackendConfig, backendConfig } from "../config";

let config: BackendConfig; 

export async function createApiClient(): Promise<any> {
  if (!config) {
    config = await backendConfig
  }

  const apiClient = axios.create({ baseURL: config.apiConfig.baseUrl })

  return apiClient
}


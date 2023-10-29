import { BackendConfig, backendConfig } from "@/app-config"
import axios from "axios"

let config: BackendConfig; 

export async function createApiClient(): Promise<any> {
  if (!config) {
    config = await backendConfig
  }

  const apiClient = axios.create({ baseURL: config.apiConfig.baseUrl })

  return apiClient
}


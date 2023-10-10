import { backendConfig } from "@/app-config"
import axios from "axios"

const { apiConfig } = backendConfig

const apiClient = axios.create({ baseURL: apiConfig?.baseUrl })


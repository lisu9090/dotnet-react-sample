import axios, { AxiosInstance } from "axios";
import { frontendConfig } from "../config";
import { AccountDto, AuthenticateAccountDto, AuthenticationResultDto, CreateAccountDto } from "@/shared/dtos";

let service: ApiService

class ApiService {
  constructor(private readonly axiosClient: AxiosInstance) { }

  public async getCurrentAccount(): Promise<AccountDto> {
    const response = await this.axiosClient.get<AccountDto>(`/account/current`)

    return response.data
  }

  public async getAccountsList(): Promise<AccountDto[]> {
    const response = await this.axiosClient.get<AccountDto[]>(`/account/list`)

    return response.data
  }

  public async createAccount(createAccountDto: CreateAccountDto): Promise<number> {
    const response = await this.axiosClient.post<number>(`/account/create`, createAccountDto)

    return response.data
  }

  public async authenticateAccount(authenticateAccountDto: AuthenticateAccountDto): Promise<AuthenticationResultDto> {
    const response = await this.axiosClient.post<AuthenticationResultDto>(`/account/authenticate`, authenticateAccountDto)

    return response.data
  }
}

export default async function initModule(): Promise<void> {
  if (service) {
    return
  }

  const { apiConfig } = await frontendConfig

  const axiosInstance = axios.create({
    baseURL: apiConfig.baseUrl
  })

  service = new ApiService(axiosInstance)
}

export function getApiService() {
  if (!service) {
    throw new Error("Module ApiService not initialized")
  }

  return service
}
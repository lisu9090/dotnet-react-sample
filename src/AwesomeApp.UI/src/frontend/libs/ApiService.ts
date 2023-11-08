import axios, { AxiosInstance } from "axios";
import { AccountDto, AuthenticateAccountDto, AuthenticationResultDto, CreateAccountDto } from "@/shared/dtos";
import { AppSettings } from "@/shared/types";

class ApiService {
  constructor(private readonly axiosClient: AxiosInstance) { }

  public async getConfig(): Promise<AppSettings> {
    const response = await this.axiosClient.get<AppSettings>(`/settings`)

    return response.data
  }

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

export const apiService = new ApiService(
  axios.create({
    baseURL: window.location.origin
  })
)
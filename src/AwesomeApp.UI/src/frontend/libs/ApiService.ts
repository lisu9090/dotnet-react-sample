import axios, { AxiosInstance } from "axios";
import { Account, AuthenticateAccount, AuthenticationResult, CreateAccount } from "@/shared/types";
import { AppSettings } from "@/shared/types";

class ApiService {
  constructor(private readonly axiosClient: AxiosInstance) { }

  public async getConfig(): Promise<AppSettings> {
    const response = await this.axiosClient.get<AppSettings>(`/settings`)

    return response.data
  }

  public async getCurrentAccount(): Promise<Account> {
    const response = await this.axiosClient.get<Account>(`/account/current`)

    return response.data
  }

  public async getAccountsList(): Promise<Account[]> {
    const response = await this.axiosClient.get<Account[]>(`/account/list`)

    return response.data
  }

  public async createAccount(createAccountEntry: CreateAccount): Promise<number> {
    const response = await this.axiosClient.post<number>(`/account/create`, createAccountEntry)

    return response.data
  }

  public async authenticateAccount(authenticateAccountEntry: AuthenticateAccount): Promise<AuthenticationResult> {
    const response = await this.axiosClient.post<AuthenticationResult>(`/account/authenticate`, authenticateAccountEntry)

    return response.data
  }
}

export const apiService = new ApiService(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })
)
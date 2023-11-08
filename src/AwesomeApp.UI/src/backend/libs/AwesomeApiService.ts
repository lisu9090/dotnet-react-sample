import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { AccountDto, AuthenticateAccountDto, AuthenticationResultDto, CreateAccountDto } from "../dtos";
import { apiSettings } from "../settings";

class AwesomeApiService {
  constructor(private readonly axiosClient: AxiosInstance) { }

  public async getAccount(id: number): Promise<AccountDto | null> {
    if (!(id > 0)) {
      throw new Error(`Parameter id must be greater than 0`)
    }

    const response = await this.axiosClient.get<AccountDto>(`/account/${id}`)
  
    switch (response.status) {
      case HttpStatusCode.Ok:
        return response.data
      case HttpStatusCode.NotFound:
        return null
      default:
        throw new Error(`Unexpected response - ${response.status}`)
    }
  }

  public async getAccounts(): Promise<AccountDto[]> {
    const response = await this.axiosClient.get<AccountDto[]>(`/account/list`)
  
    switch (response.status) {
      case HttpStatusCode.Ok:
        return response.data
      default:
        throw new Error(`Unexpected response - ${response.status}`)
    }
  }

  public async createAccount(createAccountDto: CreateAccountDto): Promise<number | null> {
    if (!createAccountDto) {
      throw new Error(`Parameter createAccountDto cannot be falsy`)
    }

    const response = await this.axiosClient.post<number>(`/account`, createAccountDto)

    switch (response.status) {
      case HttpStatusCode.Ok:
        return response.data
      case HttpStatusCode.Conflict:
        return null
      default:
        throw new Error(`Unexpected response - ${response.status}`)
    }
  }

  public async authenticateAccount(authenticateAccountDto: AuthenticateAccountDto): Promise<AuthenticationResultDto> {
    if (!authenticateAccountDto) {
      throw new Error(`Parameter authenticateAccountDto cannot be falsy`)
    }
    
    const response = await this.axiosClient.post<AuthenticationResultDto>(`/account/authenticate`, authenticateAccountDto)

    switch (response.status) {
      case HttpStatusCode.Ok:
        return response.data
      default:
        throw new Error(`Unexpected response - ${response.status}`)
    }
  }
}

const { awesomeApiConfig } = apiSettings
  
const axiosInstance = axios.create({ baseURL: awesomeApiConfig.baseUrl })

export const awesomeApiService = new AwesomeApiService(axiosInstance)

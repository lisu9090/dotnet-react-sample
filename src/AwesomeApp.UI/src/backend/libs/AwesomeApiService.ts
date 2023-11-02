import { AxiosInstance } from "axios";
import { AccountDto, AuthenticateAccountDto, AuthenticationResultDto, CreateAccountDto } from "../dtos";

export class AwesomeApiService {
  constructor(private readonly axiosClient: AxiosInstance) { }

  public getAccount(id: number): Promise<AccountDto> {
    return this.axiosClient.get(`/account/${id}`)
  }

  public createAccount(createAccountDto: CreateAccountDto): Promise<number> {
    return this.axiosClient.post(`/account`, createAccountDto)
  }

  public authenticateAccount(authenticateAccountDto: AuthenticateAccountDto): Promise<AuthenticationResultDto> {
    return this.axiosClient.post(`/account/authenticate`, authenticateAccountDto)
  }
}
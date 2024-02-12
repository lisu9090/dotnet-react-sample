import axios, { HttpStatusCode } from "axios";
import { AccountDto, AuthenticateAccountDto, AuthenticationResultDto, CreateAccountDto } from "@/backend/dtos";
import settings from "@/Settings";
import { acceptStatusCodes } from "@/shared/libs";

const { awesomeApiConfig } = settings

const axiosClient = axios.create({
  baseURL: awesomeApiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
})

export async function getAccount(id: number): Promise<AccountDto | null> {
  if (!(id > 0)) {
    throw new Error(`Parameter id must be positive intiger`)
  }

  const response = await axiosClient.get<AccountDto>(
    `/account/${id}`,
    acceptStatusCodes([HttpStatusCode.Ok, HttpStatusCode.NotFound])
  )

  return response?.data ?? null
}

export async function getAccounts(): Promise<AccountDto[]> {
  const response = await axiosClient.get<AccountDto[]>(`/account/list`)

  return response.data
}

export async function createAccount(createAccountDto: CreateAccountDto): Promise<number | null> {
  if (!createAccountDto) {
    throw new Error(`Parameter createAccountDto cannot be falsy`)
  }

  const response = await axiosClient.post<number>(
    `/account`, 
    createAccountDto,
    acceptStatusCodes([HttpStatusCode.Ok, HttpStatusCode.Conflict])
  )

  return response?.data ?? null
}

export async function authenticateAccount(authenticateAccountDto: AuthenticateAccountDto): Promise<AuthenticationResultDto> {
  if (!authenticateAccountDto) {
    throw new Error(`Parameter authenticateAccountDto cannot be falsy`)
  }

  const response = await axiosClient.post<AuthenticationResultDto>(`/account/authenticate`, authenticateAccountDto)

  return response.data
}

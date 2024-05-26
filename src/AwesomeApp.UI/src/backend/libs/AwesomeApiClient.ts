import axios, { HttpStatusCode } from 'axios';
import { AccountDto, AuthenticateAccountDto, AuthenticationResultDto, CreateAccountDto } from '@/backend/dtos';
import { AxiosRequestConfigBuilder, getDataOrNullTransformer } from '@/common/libs';

const axiosClient = axios.create({
  baseURL: process.env.AWESOME_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Awesome-API-Key': process.env.AWESOME_API_KEY
  },
})

export async function getAccount(id: number): Promise<AccountDto | null> {
  if (id <= 0) {
    throw new Error(`Parameter id must be positive intiger`)
  }

  const response = await axiosClient.get<AccountDto | null>(
    `/account/${id}`,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.NotFound)
      .addCombinedResponseTransformers(getDataOrNullTransformer)
      .build()
  )

  return response.data
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
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Conflict)
      .addCombinedResponseTransformers(getDataOrNullTransformer)
      .build()
  )

  return response.data
}

export async function authenticateAccount(authenticateAccountDto: AuthenticateAccountDto): Promise<AuthenticationResultDto> {
  if (!authenticateAccountDto) {
    throw new Error(`Parameter authenticateAccountDto cannot be falsy`)
  }

  const response = await axiosClient.post<AuthenticationResultDto>(`/account/authenticate`, authenticateAccountDto)

  return response.data
}

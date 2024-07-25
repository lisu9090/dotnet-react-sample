import axios, { HttpStatusCode } from 'axios';
import { AccountDto, AuthenticateAccountDto, AuthenticationResultDto, CreateAccountDto, PaginationResultDto, PatchUpdateAccountDto, PutUpdateAccountDto } from '@/backend/dtos';
import { AxiosRequestConfigBuilder, getDataOrNullTransformer, toQueryParams } from '@/common/libs';

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

export async function getAccounts(params: { pageNumber: number, pageSize: number }): Promise<PaginationResultDto<AccountDto>> {
  if (!params) {
    throw new Error(`Parameter params cannot be falsy`)
  }

  const response = await axiosClient.get<PaginationResultDto<AccountDto>>(`/account/list` + toQueryParams(params))

  return response.data
}

export async function createAccount(createAccountDto: CreateAccountDto): Promise<AccountDto | null> {
  if (!createAccountDto) {
    throw new Error(`Parameter createAccountDto cannot be falsy`)
  }

  const response = await axiosClient.post<AccountDto | null>(
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

export async function putUpdateAccount(updateAccountDto: PutUpdateAccountDto): Promise<AccountDto | null> {
  if (!updateAccountDto) {
    throw new Error(`Parameter updateAccountDto cannot be falsy`)
  }

  const response = await axiosClient.put<AccountDto | null>(
    `/account`, 
    updateAccountDto,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Conflict)
      .addCombinedResponseTransformers(getDataOrNullTransformer)
      .build()
  )

  return response.data
}

export async function patchUpdateAccount(updateAccountDto: PatchUpdateAccountDto): Promise<AccountDto | null> {
  if (!updateAccountDto) {
    throw new Error(`Parameter updateAccountDto cannot be falsy`)
  }

  const response = await axiosClient.patch<AccountDto | null>(
    `/account`, 
    updateAccountDto,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.NotFound)
      .addCombinedResponseTransformers(getDataOrNullTransformer)
      .build()
  )

  return response.data
}

export async function deleteAccount(id: number): Promise<void> {
  if (id <= 0) {
    throw new Error(`Parameter id must be positive intiger`)
  }

  await axiosClient.delete(`/account/${id}`)
}

export async function authenticateAccount(authenticateAccountDto: AuthenticateAccountDto): Promise<AuthenticationResultDto> {
  if (!authenticateAccountDto) {
    throw new Error(`Parameter authenticateAccountDto cannot be falsy`)
  }

  const response = await axiosClient.post<AuthenticationResultDto>(`/account/authenticate`, authenticateAccountDto)

  return response.data
}

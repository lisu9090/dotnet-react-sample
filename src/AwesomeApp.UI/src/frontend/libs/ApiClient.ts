import axios, { HttpStatusCode } from 'axios'
import { ActionResult, ActionResultBase, AppSettings, PaginationResult } from '@/common/types'
import { AxiosRequestConfigBuilder, isOkResponse, createSucessfulActionResultBase, createFailedActionResultBase, toQueryParams } from '@/common/libs'
import { Account, AuthenticateAccount, CreateAccount, PatchUpdateAccount, PutUpdateAccount } from '@/common/types/account'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

export async function fetchSettings(): Promise<AppSettings> {
  const response = await axiosClient.get<AppSettings>(`/settings`)

  return response.data
}

export async function fetchAccounts(params: { pageNumber: number, pageSize: number }): Promise<ActionResult<PaginationResult<Account>>> {
  if (!params) {
    throw new Error('params cannot be falsy')
  }
  
  const response = await axiosClient.get<ActionResult<PaginationResult<Account>>>(`/accounts` + toQueryParams(params))

  return response.data
}

export async function createAccount(createAccountEntry: CreateAccount): Promise<ActionResult<number>> {
  if (!createAccountEntry) {
    throw new Error('createAccountEntry cannot be falsy')
  }

  const response = await axiosClient.post<ActionResult<number>>(
    `/account`, 
    createAccountEntry,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Conflict)
      .build()
  )

  return response.data
}

export async function putUpdateAccount(updateAccountEntry: PutUpdateAccount, csrfToken: string | undefined): Promise<ActionResult<Account>> {
  if (!updateAccountEntry || !csrfToken) {
    throw new Error('createAccountEntry and csrfToken cannot be falsy')
  }

  const payload = {
    ...updateAccountEntry,
    csrfToken,
  }


  const response = await axiosClient.put<ActionResult<Account>>(
    `/account`, 
    payload,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Conflict)
      .build()
  )

  return response.data
}

export async function patchUpdateAccount(updateAccountEntry: PatchUpdateAccount, csrfToken: string | undefined): Promise<ActionResult<Account>> {
  if (!updateAccountEntry || !csrfToken) {
    throw new Error('createAccountEntry and csrfToken cannot be falsy')
  }

  const payload = {
    ...updateAccountEntry,
    csrfToken,
  }

  const response = await axiosClient.patch<ActionResult<Account>>(
    `/account`, 
    payload,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.NotFound)
      .build()
  )

  return response.data
}

export async function deleteAccount(id: number): Promise<ActionResultBase> {
  if (id <= 0) {
    throw new Error(`id must be positive intiger`)
  }

  const response = await axiosClient.delete<ActionResultBase>(`/account/${id}`)

  return response.data
}

export async function loginUser(authenticateAccountEntry: AuthenticateAccount, authCsrfToken: string | undefined): Promise<ActionResultBase> {
  if (!authenticateAccountEntry || !authCsrfToken) {
    throw new Error('authenticateAccountEntry and csrfToken cannot be falsy')
  }

  const payload = {
    ...authenticateAccountEntry,
    csrfToken: authCsrfToken,
  }
  
  const response = await axiosClient.post(
    `/auth/callback/awesome-credentials`, 
    payload,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Unauthorized)
      .addContentTypeHeader('application/x-www-form-urlencoded')
      .build()
  )

  return isOkResponse(response) 
    ? createSucessfulActionResultBase()
    : createFailedActionResultBase('Authentication failed. Please try again.')
}

export async function logoutUser(authCsrfToken: string | undefined): Promise<ActionResultBase> {
  if (!authCsrfToken) {
    throw new Error('csrfToken cannot be falsy')
  }

  const response = await axiosClient.post(
    `/auth/signout`, 
    { csrfToken: authCsrfToken },
    AxiosRequestConfigBuilder
      .create()
      .addContentTypeHeader('application/x-www-form-urlencoded')
      .build()
  )

  return isOkResponse(response) 
    ? createSucessfulActionResultBase()
    : createFailedActionResultBase('Authentication failed. Please try again.')
}

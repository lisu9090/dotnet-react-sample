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

/**
 * Fetches settings from backend
 * @returns AppSettings async
 */
export async function fetchSettings(): Promise<AppSettings> {
  const response = await axiosClient.get<AppSettings>(`/settings`)

  return response.data
}

/**
 * Fetches paginated chunk of Accounts set from backend
 * @param pageNumber Page number
 * @param pageSize Page Size
 * @returns ActionResult of PaginationResult of Account async
 */
export async function fetchAccounts(params: { pageNumber: number, pageSize: number }): Promise<ActionResult<PaginationResult<Account>>> {
  if (!params) {
    throw new Error('params cannot be falsy')
  }
  
  const response = await axiosClient.get<ActionResult<PaginationResult<Account>>>(`/accounts` + toQueryParams(params))

  return response.data
}

/**
 * Creates Account via backend
 * @param createAccountEntry Account to be created
 * @returns ActionResult of Acount ID async
 */
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

/**
 * Updates Account via backend
 * @param updateAccountEntry Account to be updated
 * @param csrfToken CSRF token
 * @returns ActionResult of Account async
 */
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

/**
 * Partially updates Account via backend
 * @param updateAccountEntry Account to be updated
 * @param csrfToken CSRF token
 * @returns ActionResult of Account async
 */
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

/**
 * Deletes Account via backend
 * @param id Account ID
 * @returns ActionResultBase async
 */
export async function deleteAccount(id: number, csrfToken: string | undefined): Promise<ActionResultBase> {
  if (id <= 0) {
    throw new Error(`id must be positive intiger`)
  }

  if (!csrfToken) {
    throw new Error('csrfToken cannot be falsy')
  }


  const response = await axiosClient.delete<ActionResultBase>(`/account/${id}` + toQueryParams({ csrfToken }))

  return response.data
}

/**
 * Tries to login user via backend
 * @param authenticateAccountEntry User credentials to validate
 * @param authCsrfToken NextAuth CSRF token
 * @returns ActionResultBase async
 */
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

/**
 * Tries to logout user via backend
 * @param authCsrfToken NextAuth CSRF token
 * @returns ActionResultBase async
 */
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

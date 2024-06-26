import axios, { HttpStatusCode } from 'axios'
import { ActionResult, ActionResultBase, AppSettings } from '@/common/types'
import { AxiosRequestConfigBuilder, isOkResponse, createSucessfulActionResultBase, createFailedActionResultBase } from '@/common/libs'
import { getCsrfToken } from 'next-auth/react'
import { Account, AuthenticateAccount, CreateAccount, PatchUpdateAccount, PutUpdateAccount } from '@/common/types/account'

let csrfToken: string | undefined

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

export async function initApiCientModule(): Promise<void> {
  const token = await getCsrfToken()

  if (!token) {
    throw new Error('CSRF token is not defined')
  }

  csrfToken = token
}

export async function fetchSettings(): Promise<AppSettings> {
  const response = await axiosClient.get<AppSettings>(`/settings`)

  return response.data
}

export async function fetchAccountsList(): Promise<ActionResult<Account[]>> {
  const response = await axiosClient.get<ActionResult<Account[]>>(`/account/list`)

  return response.data
}

export async function createAccount(createAccountEntry: CreateAccount): Promise<ActionResult<number>> {
  if (!createAccountEntry) {
    throw new Error('createAccountEntry cannot be falsy')
  }

  const response = await axiosClient.post<ActionResult<number>>(
    `/account/create`, 
    createAccountEntry,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Conflict)
      .build()
  )

  return response.data
}

export async function putUpdateAccount(updateAccountEntry: PutUpdateAccount): Promise<ActionResult<Account>> {
  if (!updateAccountEntry) {
    throw new Error('createAccountEntry cannot be falsy')
  }

  const response = await axiosClient.put<ActionResult<Account>>(
    `/account/update`, 
    updateAccountEntry,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Conflict)
      .build()
  )

  return response.data
}

export async function patchUpdateAccount(updateAccountEntry: PatchUpdateAccount): Promise<ActionResult<Account>> {
  if (!updateAccountEntry) {
    throw new Error('createAccountEntry cannot be falsy')
  }

  const response = await axiosClient.patch<ActionResult<Account>>(
    `/account/update`, 
    updateAccountEntry,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.NotFound)
      .build()
  )

  return response.data
}

export async function loginUser(authenticateAccountEntry: AuthenticateAccount): Promise<ActionResultBase> {
  if (!authenticateAccountEntry) {
    throw new Error('authenticateAccountEntry cannot be falsy')
  }

  const payload = {
    ...authenticateAccountEntry,
    csrfToken,
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

export async function logoutUser(): Promise<ActionResultBase> {
  const payload = { csrfToken }

  const response = await axiosClient.post(
    `/auth/signout`, 
    payload,
    AxiosRequestConfigBuilder
      .create()
      .addContentTypeHeader('application/x-www-form-urlencoded')
      .build()
  )

  return isOkResponse(response) 
    ? createSucessfulActionResultBase()
    : createFailedActionResultBase('Authentication failed. Please try again.')
}

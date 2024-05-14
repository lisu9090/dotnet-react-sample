import axios, { HttpStatusCode } from 'axios';
import { ActionResult, AppSettings } from '@/common/types';
import { AxiosRequestConfigBuilder, acceptStatusCodes, isOkResponse, setContentType } from '@/common/libs';
import { getCsrfToken } from 'next-auth/react';
import { createFailedActionResult, createSucessfulActionResult } from '@/common/libs';
import { Account, AuthenticateAccount, CreateAccount } from '@/common/types/account';
import { responseDataToAccountsResult } from '../mappings';

let csrfToken: string = '';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

export async function initApiCient(): Promise<void> {
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
  const response = await axiosClient.get<ActionResult<Account[]>>(
    `/account/list`,
    AxiosRequestConfigBuilder
      .create()
      .addResponseTransformers(responseDataToAccountsResult)
      .build()
  )

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

export async function authenticateAccount(authenticateAccountEntry: AuthenticateAccount): Promise<ActionResult<string>> {
  if (!authenticateAccountEntry) {
    throw new Error('authenticateAccountEntry cannot be falsy')
  }

  const payload = {
    ...authenticateAccountEntry,
    csrfToken,
    redirect: true,
    json: true,
  };
  
  const response = await axiosClient.post<{ url: string }>(
    `/auth/callback/awesome-credentials`, 
    payload,
    AxiosRequestConfigBuilder
      .create()
      .addAcceptStatusCodes(HttpStatusCode.Ok, HttpStatusCode.Unauthorized)
      .addContentTypeHeader('application/x-www-form-urlencoded')
      .build()
  )

  return isOkResponse(response) 
    ? createSucessfulActionResult(response.data.url)
    : createFailedActionResult('Authentication failed. Please try again.')
}

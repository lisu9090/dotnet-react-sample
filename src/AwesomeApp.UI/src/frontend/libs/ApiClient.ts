import axios, { HttpStatusCode } from "axios";
import { Account, ActionResult, AuthenticateAccount, CreateAccount } from "@/common/types";
import { AppSettings } from "@/common/types";
import { acceptStatusCodes, isOkResponse, setContentType } from "@/common/libs";
import { getCsrfToken } from "next-auth/react";
import { createFailedActionResult, createSucessfulActionResult } from "@/common/libs";

let csrfToken: string = '';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
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

export async function fetchCurrentAccount(): Promise<ActionResult<Account>> {
  const response = await axiosClient.get<ActionResult<Account>>(
    `/account/current`,
    acceptStatusCodes([HttpStatusCode.Ok, HttpStatusCode.NotFound])
  )

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
    acceptStatusCodes([HttpStatusCode.Ok, HttpStatusCode.Conflict])
  )

  return response.data
}

export async function authenticateAccount(authenticateAccountEntry: AuthenticateAccount): Promise<ActionResult<string>> {
  if (!authenticateAccountEntry) {
    throw new Error('authenticateAccountEntry cannot be falsy')
  }
  
  const response = await axiosClient.post<{url: string}>(
    `/auth/callback/awesome-credentials`, 
    {
      ...authenticateAccountEntry,
      csrfToken,
      redirect: true,
      json: true,
    },
    {
      ...acceptStatusCodes([HttpStatusCode.Ok, HttpStatusCode.Unauthorized]),
      ...setContentType('application/x-www-form-urlencoded')
    }
  )

  return isOkResponse(response) 
    ? createSucessfulActionResult(response.data.url)
    : createFailedActionResult('Authentication failed. Please try again.')
}

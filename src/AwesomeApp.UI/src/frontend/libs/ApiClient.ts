import axios, { HttpStatusCode } from "axios";
import { Account, ActionResult, AuthenticateAccount, AuthenticationResult, CreateAccount } from "@/shared/types";
import { AppSettings } from "@/shared/types";
import { acceptStatusCodes } from "@/shared/libs";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

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

export async function authenticateAccount(
  authenticateAccountEntry: AuthenticateAccount, 
  csrfToken?: string
): Promise<ActionResult<AuthenticationResult>> {
  if (!authenticateAccountEntry) {
    throw new Error('authenticateAccountEntry cannot be falsy')
  }
  
  const response = await axiosClient.post<ActionResult<AuthenticationResult>>(
    `/auth/callback/AwesomeAccountProvider`, 
    {
      ...authenticateAccountEntry,
      csrfToken,
      redirect: false,
      json: true,
      // callbackUrl: 'http://localhost:3000/login'
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )

  return response.data
}

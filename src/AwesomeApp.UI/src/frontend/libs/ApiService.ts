import axios from "axios";
import { Account, AuthenticateAccount, AuthenticationResult, CreateAccount } from "@/shared/types";
import { AppSettings } from "@/shared/types";

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

export async function fetchCurrentAccount(): Promise<Account> {
  const response = await axiosClient.get<Account>(`/account/current`)

  return response.data
}

export async function fetchAccountsList(): Promise<Account[]> {
  const response = await axiosClient.get<Account[]>(`/account/list`)

  return response.data
}

export async function createAccount(createAccountEntry: CreateAccount): Promise<number> {
  const response = await axiosClient.post<number>(`/account/create`, createAccountEntry)

  return response.data
}

export async function authenticateAccount(authenticateAccountEntry: AuthenticateAccount): Promise<AuthenticationResult> {
  const response = await axiosClient.post<AuthenticationResult>(`/account/authenticate`, authenticateAccountEntry)

  return response.data
}

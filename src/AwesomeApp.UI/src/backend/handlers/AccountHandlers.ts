import { NextApiRequest, NextApiResponse } from "next";
import { AccountDto, CreateAccountDto } from "../dtos";
import { HttpStatusCode } from "axios";
import { awesomeApiService } from "../libs";
import { AccountRole } from "@/shared/types";
import { AuthenticationResult } from "@/shared/types";

export async function getCurrentAccount(req: NextApiRequest, res: NextApiResponse<AccountDto | string>): Promise<void> {
  const currentAccountId =  req.session.user?.id!

  const accountDto = await awesomeApiService.getAccount(currentAccountId)

  if (accountDto) {
    res.send(accountDto)
  } else {
    res.status(HttpStatusCode.NotFound).send("Account not found")
  }
} 

export async function getAccountsList(_: NextApiRequest, res: NextApiResponse<AccountDto[]>): Promise<void> {
  const accountDtos = await awesomeApiService.getAccounts()

  res.send(accountDtos)
} 

export async function postCreateAccount(req: NextApiRequest, res: NextApiResponse<number | string>): Promise<void> {
  const payload: CreateAccountDto = {
    ...req.body,
    accountRole: AccountRole.User
  } 

  const accountId = await awesomeApiService.createAccount(payload)

  if (accountId) {
    res.send(accountId)
  } else {
    res.status(HttpStatusCode.Conflict).send('Conflict while creating account')
  }
} 

export async function postAuthenticate(req: NextApiRequest, res: NextApiResponse<AuthenticationResult>): Promise<void> {
  const authenticationResultDto = await awesomeApiService.authenticateAccount(req.body)

  if (authenticationResultDto.authenticationSuccessful) {
    req.session.user = { id: authenticationResultDto.accountId!, role: authenticationResultDto.accountRole! }
    
    await req.session.save()
  }

  res.send(authenticationResultDto)
}

import { NextApiRequest, NextApiResponse } from "next";
import { AccountDto, CreateAccountDto } from "../dtos";
import { HttpStatusCode } from "axios";
import { awesomeApiService } from "../libs";
import { AccountRole, ActionResult } from "@/shared/types";
import { AuthenticationResult } from "@/shared/types";
import { createFailedActionResult, createSucessfulActionResult } from "../libs/ActionResultFactories";

export async function getCurrentAccount(req: NextApiRequest, res: NextApiResponse<ActionResult<AccountDto>>): Promise<void> {
  const currentAccountId =  req.session.user?.id!

  const accountDto = await awesomeApiService.getAccount(currentAccountId)

  if (accountDto) {
    res.send(createSucessfulActionResult(accountDto))
  } else {
    res.status(HttpStatusCode.NotFound)
      .send(createFailedActionResult("Account not found"))
  }
} 

export async function getAccountsList(_: NextApiRequest, res: NextApiResponse<ActionResult<AccountDto[]>>): Promise<void> {
  const accountDtos = await awesomeApiService.getAccounts()

  res.send(createSucessfulActionResult(accountDtos))
} 

export async function postCreateAccount(req: NextApiRequest, res: NextApiResponse<ActionResult<number>>): Promise<void> {
  const payload: CreateAccountDto = {
    ...req.body,
    accountRole: AccountRole.User
  } 

  const accountId = await awesomeApiService.createAccount(payload)

  if (accountId) {
    res.send(createSucessfulActionResult(accountId))
  } else {
    res.status(HttpStatusCode.Conflict)
      .send(createFailedActionResult('Conflict while creating account'))
  }
} 

export async function postAuthenticate(req: NextApiRequest, res: NextApiResponse<ActionResult<AuthenticationResult>>): Promise<void> {
  const authenticationResultDto = await awesomeApiService.authenticateAccount(req.body)

  if (authenticationResultDto.authenticationSuccessful) {
    req.session.user = { id: authenticationResultDto.accountId!, role: authenticationResultDto.accountRole! }
    
    await req.session.save()
  }

  res.send(createSucessfulActionResult(authenticationResultDto))
}

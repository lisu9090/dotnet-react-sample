import { NextApiRequest, NextApiResponse } from "next";
import { HttpStatusCode } from "axios";
import { AccountRole, ActionResult, AuthenticationResult } from "@/shared/types";
import { AccountDto, CreateAccountDto } from "@/backend/dtos";
import { createFailedActionResult, createSucessfulActionResult } from "@/shared/libs";
import { getAccount, getAccounts, createAccount, authenticateAccount } from "@/backend/libs";
import { getSession } from "@/shared/libs";

export async function getCurrentAccount(req: NextApiRequest, res: NextApiResponse<ActionResult<AccountDto>>): Promise<void> {
  const session = await getSession(req, res)
  const currentAccountId = 0 //session?.user?.id

  const accountDto = await getAccount(currentAccountId)

  if (accountDto) {
    res.send(createSucessfulActionResult(accountDto))
  } else {
    res.status(HttpStatusCode.NotFound)
      .send(createFailedActionResult("Account not found"))
  }
} 

export async function getAccountsList(_: NextApiRequest, res: NextApiResponse<ActionResult<AccountDto[]>>): Promise<void> {
  const accountDtos = await getAccounts()

  res.send(createSucessfulActionResult(accountDtos))
} 

export async function postCreateAccount(req: NextApiRequest, res: NextApiResponse<ActionResult<number>>): Promise<void> {
  const payload: CreateAccountDto = {
    ...req.body,
    accountRole: AccountRole.User
  } 

  const accountId = await createAccount(payload)

  if (accountId) {
    res.send(createSucessfulActionResult(accountId))
  } else {
    res.status(HttpStatusCode.Conflict)
      .send(createFailedActionResult('Account with this email exists'))
  }
}

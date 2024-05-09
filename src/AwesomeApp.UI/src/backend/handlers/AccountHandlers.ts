import { NextApiRequest, NextApiResponse } from "next";
import { HttpStatusCode } from "axios";
import { Account, AccountRole, ActionResult } from "@/common/types";
import { CreateAccountDto } from "@/backend/dtos";
import { createFailedActionResult, createSucessfulActionResult } from "@/common/libs";
import { getAccounts, createAccount } from "@/backend/libs";
import { toAccounts } from "../mappings";

export async function getAccountsList(_: NextApiRequest, res: NextApiResponse<ActionResult<Account[]>>): Promise<void> {
  const accountDtos = await getAccounts()

  res.send(createSucessfulActionResult(toAccounts(accountDtos)))
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

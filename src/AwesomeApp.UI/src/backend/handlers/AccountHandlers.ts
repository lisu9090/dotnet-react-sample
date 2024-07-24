import { NextApiRequest, NextApiResponse } from 'next'
import { HttpStatusCode } from 'axios'
import { ActionResult } from '@/common/types'
import { CreateAccountDto, PatchUpdateAccountDto } from '@/backend/dtos'
import { createFailedActionResult, createSucessfulActionResult } from '@/common/libs'
import { 
  getAccounts, 
  createAccount, 
  putUpdateAccount as putUpdateAccountApiCall,
  patchUpdateAccount as patchUpdateAccountApiCall, 
} from '@/backend/libs'
import { accountDtoToAccount, accountDtosToAccounts } from '../mappings'
import { Account, AccountRole } from '@/common/types/account'
import { Session } from 'next-auth'

export async function getAccountsList(_: NextApiRequest, res: NextApiResponse<ActionResult<Account[]>>): Promise<void> {
  const accountDtos = await getAccounts()

  res.send(createSucessfulActionResult(accountDtosToAccounts(accountDtos)))
}

export async function postCreateAccount(req: NextApiRequest, res: NextApiResponse<ActionResult<number>>): Promise<void> {
  const payload: CreateAccountDto = {
    ...req.body,
    accountRole: AccountRole.User
  }

  const accountDto = await createAccount(payload)

  if (accountDto) {
    res.send(createSucessfulActionResult(accountDto.id))
  } else {
    res.status(HttpStatusCode.Conflict)
      .send(createFailedActionResult('Account with this email exists'))
  }
}

export async function putUpdateAccount(req: NextApiRequest, res: NextApiResponse<ActionResult<Account>>): Promise<void> {
  const accountDto = await putUpdateAccountApiCall(req.body)

  if (accountDto) {
    res.send(createSucessfulActionResult(accountDtoToAccount(accountDto)))
  } else {
    res.status(HttpStatusCode.Conflict)
      .send(createFailedActionResult('Account with this email exists'))
  }
}

export async function patchUpdateAccount(req: NextApiRequest, res: NextApiResponse<ActionResult<Account>>, session: Session): Promise<void> {
  const payload: PatchUpdateAccountDto = {
    ...req.body,
    id: session.user.id
  }

  const accountDto = await patchUpdateAccountApiCall(payload)

  if (accountDto) {
    res.send(createSucessfulActionResult(accountDtoToAccount(accountDto)))
  } else {
    res.status(HttpStatusCode.NotFound)
      .send(createFailedActionResult('Account not found'))
  }
}

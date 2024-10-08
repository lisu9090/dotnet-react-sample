import { NextApiRequest, NextApiResponse } from 'next'
import { HttpStatusCode } from 'axios'
import { ActionResult, ActionResultBase, PaginationResult } from '@/common/types'
import { CreateAccountDto, PatchUpdateAccountDto } from '@/backend/dtos'
import { createFailedActionResult, createSuccessfulActionResult, createSuccessfulActionResultBase } from '@/common/libs'
import { 
  getAccounts, 
  createAccount, 
  putUpdateAccount as putUpdateAccountApiCall,
  patchUpdateAccount as patchUpdateAccountApiCall,
  deleteAccount, 
} from '@/backend/libs'
import { accountDtoToAccount, accountDtosToAccounts, paginationResultDtoToPaginationResult } from '../mappings'
import { Account, AccountRole } from '@/common/types/account'
import { Session } from 'next-auth'

/**
 * Request handler which responds with paginated collection of Accounts
 * @param req NextApiRequest
 * @param res NextApiResponse of ActionResult of PaginatedResult of Account
 */
export async function getAccountsHandler(req: NextApiRequest, res: NextApiResponse<ActionResult<PaginationResult<Account>>>): Promise<void> {  
  const pageNumber = req.query.pageNumber as string | undefined
  const pageSize = req.query.pageSize as string | undefined
    
  const paginationResult = await getAccounts({ 
    pageNumber: Number.parseInt(pageNumber ?? '1'),
    pageSize: Number.parseInt(pageSize ?? '20')
  })

  res.send(
    createSuccessfulActionResult(
      paginationResultDtoToPaginationResult({
        ...paginationResult,
        items: accountDtosToAccounts(paginationResult.items)
      })
    )
  )
}

/**
 * Request handler which creates Account; it responds with failed ActionResult in case of conflict
 * @param req NextApiRequest
 * @param res NextApiResponse of ActionResult of Account ID
 */
export async function postCreateAccountHandler(req: NextApiRequest, res: NextApiResponse<ActionResult<number>>): Promise<void> {
  const payload: CreateAccountDto = {
    ...req.body,
    accountRole: AccountRole.User
  }

  const accountDto = await createAccount(payload)

  if (accountDto) {
    res.send(createSuccessfulActionResult(accountDto.id))
  } else {
    res.status(HttpStatusCode.Conflict)
      .send(createFailedActionResult('Account with this email exists'))
  }
}

/**
 * Request handler which creates or updates Account; it responds with failed ActionResult in case of conflict
 * @param req NextApiRequest
 * @param res NextApiResponse of ActionResult of Account
 */
export async function putUpdateAccountHandler(req: NextApiRequest, res: NextApiResponse<ActionResult<Account>>): Promise<void> {
  const accountDto = await putUpdateAccountApiCall(req.body)

  if (accountDto) {
    res.send(createSuccessfulActionResult(accountDtoToAccount(accountDto)))
  } else {
    res.status(HttpStatusCode.Conflict)
      .send(createFailedActionResult('Account with this email exists'))
  }
}

/**
 * Request handler which updates Account using ID obtained from request Session; it responds with failed ActionResult in case of not found
 * @param req NextApiRequest
 * @param res NextApiResponse of ActionResult of Account
 * @param session Request Session
 */
export async function patchUpdateAccountHandler(req: NextApiRequest, res: NextApiResponse<ActionResult<Account>>, session: Session): Promise<void> {
  const payload: PatchUpdateAccountDto = {
    ...req.body,
    id: session.user.id
  }

  const accountDto = await patchUpdateAccountApiCall(payload)

  if (accountDto) {
    res.send(createSuccessfulActionResult(accountDtoToAccount(accountDto)))
  } else {
    res.status(HttpStatusCode.NotFound)
      .send(createFailedActionResult('Account not found'))
  }
}

/**
 * Request handler which deletes Account
 * @param req NextApiRequest 
 * @param res NextApiResponse of ActionResultBase
 */
export async function deleteAccountHandler(req: NextApiRequest, res: NextApiResponse<ActionResultBase>): Promise<void> {
  const accountId = req.query.accountId as string

  await deleteAccount(Number.parseInt(accountId))

  res.send(createSuccessfulActionResultBase())
}
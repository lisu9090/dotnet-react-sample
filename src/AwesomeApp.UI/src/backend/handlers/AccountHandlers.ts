import { NextApiRequest, NextApiResponse } from "next";
import { AccountDto } from "../dtos";
import { createAwesomeApiService } from "../libs";
import { HttpStatusCode } from "axios";

export async function getCurrentAccount(req: NextApiRequest, res: NextApiResponse<AccountDto | string>): Promise<void> {
  const apiService = await createAwesomeApiService() 
  
  const currentAccountId =  req.session.user?.id!

  const accountDto = await apiService.getAccount(currentAccountId)

  if (accountDto) {
    res.send(accountDto)
  } else {
    res.status(404).send("Account not found")
  }
} 

export async function getAccountsList(_: NextApiRequest, res: NextApiResponse<AccountDto[]>): Promise<void> {
  const apiService = await createAwesomeApiService() 
  
  const accountDtos = await apiService.getAccounts()

  res.send(accountDtos)
} 

export async function postCreateAccount(req: NextApiRequest, res: NextApiResponse<number | string>): Promise<void> {
  const apiService = await createAwesomeApiService() 
  
  const accountId = await apiService.createAccount(req.body)

  if (accountId) {
    res.send(accountId)
  } else {
    res.status(HttpStatusCode.Conflict).send('Conflict while creating account')
  }
} 

export async function postAuthenticate(req: NextApiRequest, res: NextApiResponse<number | string>): Promise<void> {
  const apiService = await createAwesomeApiService() 
  
  const authenticationResultDto = await apiService.authenticateAccount(req.body)

  if (authenticationResultDto.authenticationSuccessful) {
    req.session.user = { id: authenticationResultDto.accountId!, role: authenticationResultDto.accountRole! }
    
    await req.session.save()
  
    res.send(authenticationResultDto.accountId!)
  } else {
    res.send(authenticationResultDto.authenticationErrorMessage!)
  }
}

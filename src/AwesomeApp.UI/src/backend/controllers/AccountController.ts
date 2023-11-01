import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationResultDto, CreateAccountDto } from "../dtos";
import { CustomerType } from "@/shared";
import { createApiClient } from "../libs";

export async function getAccountById(req: NextApiRequest, res: NextApiResponse<any>): Promise<void> {
  const apiClient = await createApiClient()
  
  const apiResponse = await apiClient.get(`http://localhost:5036/account/${req.query.id}`)

  if (apiResponse.ok) {
    res.send(await apiResponse.json())
  } else {
    res.status(404).send("Not found")
  }
} 

export async function createAccount(req: NextApiRequest, res: NextApiResponse<CreateAccountDto>) {
  res.json({
    email: "test@test.com",
    password: "Test",
    fullName: "Test Test",
    dateOfBirth: new Date(),
    vechiclesNumber: 0,
    customerType: CustomerType.private
  })
} 

export async function authenticate(req: NextApiRequest, res: NextApiResponse<number | string>) {
  const apiClient = await createApiClient()

  const apiResponse = await apiClient.post('http://localhost:5036/account/authenticate', req.body)

  if (apiResponse.ok) {
    const authResult: AuthenticationResultDto = await apiResponse.json()
    
    if (authResult.authenticationSuccessful) {
      req.session.user = { id: authResult.accountId!, role: authResult.accountRole! }
      
      await req.session.save()
    
      res.send(authResult.accountId!)
    } else {
      res.send(authResult.authenticationErrorMessage!)
    }
  } else {
    throw new Error(await apiResponse.text())
  }
}

import { CreateAccountDto } from '@/types/dtos'
import { CustomerType } from '@/types/models'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function authenticateAccountEndpoint(req: NextApiRequest, res: NextApiResponse<CreateAccountDto>) {
  res.json({
    email: "test@test.com",
    password: "Test",
    fullName: "Test Test",
    dateOfBirth: new Date(),
    vechiclesNumber: 0,
    customerType: CustomerType.private
  })
}
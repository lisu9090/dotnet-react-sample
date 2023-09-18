import { CreateAccountDto } from '@/types/dtos'
import { CustomerType } from '@/types/models'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function createAccountEndpoint(req: NextApiRequest, res: NextApiResponse<CreateAccountDto>) {
  const test = await fetch('https://localhost:7075/account?id=1')

  res.
} 
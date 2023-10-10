import { FrontendConfig, frontendConfig } from '@/app-config'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getFrontendConfigEndpoint(_: NextApiRequest, res: NextApiResponse<FrontendConfig>) {
  res.json(await frontendConfig)
}

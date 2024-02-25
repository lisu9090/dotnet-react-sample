import { NextApiRequest, NextApiResponse } from "next"
import { NextAuthOptions, getServerSession } from "next-auth"

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    
  ]
}

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, nextAuthOptions)

  if (!session) {
    throw new Error("Not authorized")
  }

  return session
}
import { nextAuthOptions } from "@/backend/libs"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, nextAuthOptions)

  if (!session || !session.user) {
    throw new Error("Not authorized")
  }

  return {
    ...session,
    user: session.user!
  }
}
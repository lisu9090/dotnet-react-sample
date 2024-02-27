import { authenticateAccount, getAccount } from "@/backend/libs"
import { NextApiRequest, NextApiResponse } from "next"
import { NextAuthOptions, User, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { isProdEnvironment } from "./EnvironmentHelpers"

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.SESSION_PASSWORD,
  useSecureCookies: isProdEnvironment(),
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      id: 'awesome-credentials',
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@inbox.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        console.log(credentials)

        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }

        const authenticationResult = await authenticateAccount(credentials)

        if (!authenticationResult.authenticationSuccessful) {
          return null
        }

        const account = await getAccount(authenticationResult.accountId!)
        
        if (!account) {
          return null
        }

        return {
          id: account.id.toString(),
          email: account.email,
          name: account.fullName,
        } as User
      },
    })
  ]
}

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, nextAuthOptions)

  if (!session) {
    throw new Error("Not authorized")
  }

  return session
}
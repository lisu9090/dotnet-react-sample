import { authenticateAccount } from '@/backend/libs'
import { isProdEnvironment } from '@/common/libs'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions, getServerSession as nextGetServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { accountSessionDtoToUser as accountSessionDtoToUser } from '../mappings'
import { PAGE_LOGIN } from '@/common/consts'

const sessionSecret = process.env.SESSION_PASSWORD
const sessionMaxAge = Number.parseInt(process.env.SESSION_MAX_AGE ?? '') || (3600 * 24)
const useSecureCookie = isProdEnvironment()

/**
 * NextAuth options
 */
export const nextAuthOptions: NextAuthOptions = {
  secret: sessionSecret,
  useSecureCookies: useSecureCookie,
  session: {
    strategy: "jwt",
    maxAge: sessionMaxAge,
    updateAge: sessionMaxAge
  },
  jwt: {
    maxAge: sessionMaxAge
  },
  pages: {
    signIn: PAGE_LOGIN
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id as number
        token.role = user.role
        token.name = user.name
        token.email = user.email
      }

      return token
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    }
  },
  providers: [
    CredentialsProvider({
      id: 'awesome-credentials',
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const authenticationResult = await authenticateAccount(credentials)

        if (!authenticationResult.authenticationSuccessful || !authenticationResult.account) {
          return null
        }

        return accountSessionDtoToUser(authenticationResult.account)
      },
    })
  ]
}

/**
 * Gets user session for backend
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @returns Session or null
 */
export const getServerSession = (req: NextApiRequest, res: NextApiResponse) => nextGetServerSession(req, res, nextAuthOptions)

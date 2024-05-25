import { authenticateAccount } from '@/backend/libs'
import { isProdEnvironment } from '@/common/libs'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions, User, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const sessionSecret = process.env.SESSION_PASSWORD
const sessionMaxAge = process.env.SESSION_MAX_AGE ? Number.parseInt(process.env.SESSION_MAX_AGE) : undefined
const useSecureCookie = isProdEnvironment()

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
    signIn: '/login'
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
        email: { label: 'Email', type: 'text', placeholder: 'you@inbox.com' },
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

        return {
          id: authenticationResult.account.id,
          email: authenticationResult.account.email,
          name: authenticationResult.account.fullName,
          role: authenticationResult.account.accountRole,
        } as User
      },
    })
  ]
}

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, nextAuthOptions)

  if (!session || !session.user) {
    throw new Error('Not authorized')
  }

  return {
    ...session,
    user: session.user!
  }
}

import { authenticateAccount, getAccount } from "@/backend/libs"
import { isProdEnvironment } from "@/shared/libs"
import { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.SESSION_PASSWORD,
  useSecureCookies: isProdEnvironment(),
  pages: {
    signIn: '/login'
  },
  callbacks: {
    redirect: ({ baseUrl }) => `${baseUrl}/account`,
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
        email: { label: "Email", type: "text", placeholder: "you@inbox.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
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

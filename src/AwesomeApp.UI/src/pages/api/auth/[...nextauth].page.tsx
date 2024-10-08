import { nextAuthOptions } from '@/backend/libs'
import NextAuth from 'next-auth'

/**
 * Creates NextAuth API endpoints
 */
export default NextAuth(nextAuthOptions)
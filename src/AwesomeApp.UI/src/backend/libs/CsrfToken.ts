import { createHmac } from 'crypto'

/**
 * Creates CSRF token out of Authentication cookie value
 * @param authCookie Authentication cookie value
 * @returns CSRF token
 */
export const getCsrfToken = (authCookie: string) => 
  createHmac('sha256', process.env.SESSION_PASSWORD!)
    .update(authCookie)
    .digest('hex')

import { createHmac } from 'crypto'

export const getCsrfToken = (authCookie: string) => 
  createHmac('sha256', process.env.SESSION_PASSWORD!)
    .update(authCookie)
    .digest('hex')

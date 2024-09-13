import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { HttpStatusCode } from 'axios'
import { Session, getServerSession } from 'next-auth'
import { nextAuthOptions } from './NextAuth'
import { AccountRole } from '@/common/types/account'
import { getCsrfToken } from './CsrfToken'

/**
 * type of function which is request handler and accepts extra parameter of Session
 */
export type SessionApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>, session: Session) => 
  unknown | Promise<unknown>

/**
 * Type of function which authorizes request access the resource and returns access indicator
 */
export type ResourceRequestAuthorization = (req: NextApiRequest, session: Session) => 
  boolean | Promise<boolean>

/**
 * Dictionary of HTTP methot and its NextApiHandler
 */
export interface EndpointHandlers {
  /**
   * HTTP Method: request handler
   */
  [method: string]: NextApiHandler
}

/**
 * Backend request processing middleware; it delegates request processing to handler (or other middleware) based on HTTP method;
 * if request uses method that is not defined, it responds with MethodNotAllowed
 * @param endpointHandlers Dictionary of HTTP mathods and handlers
 * @returns Decorated handler
 */
export function withEndpoints(endpointHandlers: EndpointHandlers): NextApiHandler {
  return async (req, res) => {
    if (req.method && endpointHandlers[req.method]) {
      await endpointHandlers[req.method](req, res)
    } else {
      res.status(HttpStatusCode.MethodNotAllowed)
        .send('Method not allowed at this endpoint')
    }
  }
}

/**
 * Backend request processing middleware; it compares CSRF token calculated out of session-token against value received in the body;
 * it delegates processing to next handler when CSRF token is valid, otherwise responds with Forbidden
 * @param handler Request handler 
 * @returns Decorated handler
 */
export function withCsrfTokenValidation(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const authCookie = req.cookies['next-auth.session-token']
    const expectedTokenValue = authCookie ? getCsrfToken(authCookie) : undefined
    const actualTokenValue = req.body.csrfToken ?? req.query.csrfToken

    if (!expectedTokenValue || actualTokenValue === expectedTokenValue) {
      await handler(req, res)
    } else {
      res.status(HttpStatusCode.Forbidden)
        .send('Forbidden')
    }
  }
}

/**
 * Backend request processing middleware; it authenticates request by obtaining its Session; 
 * it delegates processing to next request handler when session exists, otherwise responds with Unauthorized
 * @param handler Request handler
 * @returns Decorated handler
 */
export function withAuthentication(handler: SessionApiHandler): NextApiHandler {
  return async (req, res) => {
    const session = await getServerSession(req, res, nextAuthOptions)
    
    if (session) {
      await handler(req, res, session)
    } else {
      res.status(HttpStatusCode.Unauthorized)
        .send('Not authorized, please login')
    }
  }
}

/**
 * Backend request processing middleware; it authorizes request by checking role from its Session against collection of allowed roles;
 * it delegates processing to next request handler when allowed roles includes AccountRole from Session, otherwise returns Forbidden
 * @param allowedRoles Collection of allowed roles
 * @param handler Request handler
 * @returns Decorated handler
 */
export function withRoleAuthorization(allowedRoles: AccountRole[], handler: SessionApiHandler): NextApiHandler {
  return withAuthentication(async (req, res, session) => {
    if (allowedRoles.length == 0 || allowedRoles.includes(session.user.role)) {
      await handler(req, res, session)
    } else {
      res.status(HttpStatusCode.Forbidden)
        .send('Forbidden')
    }
  })
}

/**
 * Backend request processing middleware; it authorizes request by checking if request has acceess to the particular resource;
 * it delegates processing to next request handler when authorize function returns true, otherwise returns Forbidden
 * @param authorize Authorization function which indicates request acceess
 * @param handler Request handler
 * @returns Decorated handler
 */
export function withResourceAuthorization(authorize: ResourceRequestAuthorization, handler: SessionApiHandler): NextApiHandler {
  return withAuthentication(async (req, res, session) => {
    if (await authorize(req, session)) {
      await handler(req, res, session)
    } else {
      res.status(HttpStatusCode.Forbidden)
        .send('Forbidden')
    }
  })
}

/**
 * Backend request processing middleware; it wraps execution of next request handler with try-catch clause; 
 * it returns InternalServerError on any error occurence
 * @param handler Request handler
 * @returns Decorated handler
 */
export function withErrorHandling(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res)
    }
    catch (e) {
      res.status(HttpStatusCode.InternalServerError)
        .send('Internal server error - ' + e)
    }
  }
}
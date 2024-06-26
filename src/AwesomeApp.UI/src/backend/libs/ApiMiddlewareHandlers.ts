import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { HttpStatusCode } from 'axios';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './NextAuth';
import { AccountRole } from '@/common/types/account';
import { HEADER_CSRF_TOKEN } from '@/common/consts';
import { getCsrfToken } from 'next-auth/react';

export type SessionApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>, session: Session) => 
  unknown | Promise<unknown>

export type ResourceRequestAuthorization = (req: NextApiRequest, session: Session) => 
  boolean | Promise<boolean>

export interface EndpointHandlers {
  [method: string]: NextApiHandler
}

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

export function withCsrfTokenValidation(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const tokenValue = req.headers[HEADER_CSRF_TOKEN] as string | undefined
    const requiredTokenValue = await getCsrfToken({ req })

    if (tokenValue && tokenValue === requiredTokenValue) {
      await handler(req, res)
    } else {
      res.status(HttpStatusCode.Forbidden)
        .send('Forbidden')
    }
  }
}

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
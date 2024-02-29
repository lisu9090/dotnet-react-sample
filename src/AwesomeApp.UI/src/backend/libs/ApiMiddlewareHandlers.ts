import { NextApiHandler } from "next";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./NextAuthOptions";

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

export function withAuthentication(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const session = await getServerSession(req, res, nextAuthOptions)
    
    if (session) {
      await handler(req, res)
    } else {
      res.status(HttpStatusCode.Unauthorized)
        .send("Not authorized, please login")
    }
  }
}

export function withErrorHandling(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res)
    }
    catch (e) {
      res.status(HttpStatusCode.InternalServerError)
        .send("Internal server error - " + e)
    }
  }
}
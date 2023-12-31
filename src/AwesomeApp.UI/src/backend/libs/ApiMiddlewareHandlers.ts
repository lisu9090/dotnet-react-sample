import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import { sessionConfig } from ".";
import { HttpStatusCode } from "axios";

export interface EndpointHandlers {
  [method: string]: NextApiHandler
}

export function withEndpoints(endpointHandlers: EndpointHandlers): NextApiHandler {
  return async (req, res) => {
    if (req.method && endpointHandlers[req.method!]) {
      await endpointHandlers[req.method!](req, res)
    } else {
      res.status(HttpStatusCode.NotFound).send('Not found')
    }
  }
}

export function withAuthentication(handler: NextApiHandler): NextApiHandler {
  return withIronSessionApiRoute(handler, sessionConfig)
}

export function withErrorHandling(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res)
    }
    catch (e) {
      res.status(HttpStatusCode.InternalServerError).send("Internal server error - " + e)
    }
  }
}
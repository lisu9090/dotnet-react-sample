import { apiClient } from "@/lib";
import { sessionConfig } from "@/lib/IronSessionConfig";
import { AuthenticationResultDto } from "@/types/dtos/AuthenticationResultDto";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function authenticate(req: NextApiRequest, res: NextApiResponse<number | string>) {
  const apiResponse = await apiClient.post('http://localhost:5036/account/authenticate', req.body)

  if (apiResponse.ok) {
    const authResult: AuthenticationResultDto = await apiResponse.json()
    
    if (authResult.authenticationSuccessful) {
      req.session.user = { id: authResult.accountId!, role: authResult.accountRole! }
      
      await req.session.save()
    
      res.send(authResult.accountId!)
    } else {
      res.send(authResult.authenticationErrorMessage!)
    }
  }

  res.status(500).send("Server error")
}

export default withIronSessionApiRoute(authenticate, sessionConfig)
  
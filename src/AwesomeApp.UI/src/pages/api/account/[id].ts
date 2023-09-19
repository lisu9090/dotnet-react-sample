import { NextApiRequest, NextApiResponse } from 'next'

export default async function getAccountByIdEndpoint(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const apiResponse = await fetch('http://localhost:5036/account/' + req.query.id, { method: 'GET' })

    if (apiResponse.ok) {
      return res.send(await apiResponse.json())
    }
  }
  catch (e) {
    res.json(e)
  }

  res.status(404).send("Not found")
} 
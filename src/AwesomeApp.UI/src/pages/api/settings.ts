import { withEndpoints, withErrorHandling } from "@/backend/libs";
import { AppSettings, HttpMethod } from "@/shared/types";
import { NextApiResponse } from "next";

export default
withErrorHandling(
  withEndpoints({
    [HttpMethod.get]: (_, res: NextApiResponse<AppSettings>) => res.send({})
  })
)
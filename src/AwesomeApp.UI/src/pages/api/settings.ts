import { withEndpoints, withErrorHandling } from "@/backend/libs";
import { AppSettings, HttpMethod } from "@/shared/types";

export default
withErrorHandling(
  withEndpoints({
    [HttpMethod.get]: (_, res) => res.send({} as AppSettings)
  })
)
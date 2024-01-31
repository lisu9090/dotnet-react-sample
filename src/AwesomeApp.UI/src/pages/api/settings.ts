import { withEndpoints, withErrorHandling } from "@/backend/libs";
import { HttpMethod } from "@/shared/types";

export default
withErrorHandling(
  withEndpoints({
    [HttpMethod.get]: (_, res) => res.send({})
  })
)
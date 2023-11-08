import { withEndpoints, withErrorHandling } from "@/backend/libs";
import { appSettings } from "@/backend/settings";
import { HttpMethod } from "@/shared/types";

export default
withErrorHandling(
  withEndpoints({
    [HttpMethod.get]: (_, res) => res.send(appSettings)
  })
)
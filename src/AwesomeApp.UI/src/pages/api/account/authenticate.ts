import { withAuthentication, withEndpoints, withErrorHandling } from "@/backend/libs";
import { HttpMethod } from "@/shared/HttpMethod";
import { authenticate } from "@/backend/handlers/AccountHandlers";

export default 
withErrorHandling(
  withAuthentication(
    withEndpoints({
      [HttpMethod.get]: authenticate
    })
  )
)
  
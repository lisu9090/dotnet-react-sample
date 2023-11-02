import { withAuthentication, withEndpoints, withErrorHandling } from "@/backend/libs";
import { HttpMethod } from "@/shared/models/HttpMethod";
import { postAuthenticate } from "@/backend/handlers/AccountHandlers";

export default 
withErrorHandling(
  withAuthentication(
    withEndpoints({
      [HttpMethod.post]: postAuthenticate
    })
  )
)
  
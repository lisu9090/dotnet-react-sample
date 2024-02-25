import { withEndpoints, withErrorHandling } from "@/backend/libs";
import { HttpMethod } from "@/shared/types/HttpMethod";
import { postAuthenticate } from "@/backend/handlers/AccountHandlers";

export default 
withErrorHandling(
  withEndpoints({
    [HttpMethod.post]: postAuthenticate
  })
)
  
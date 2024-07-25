import { postCreateAccountHandler } from '@/backend/handlers/AccountHandlers'
import { withEndpoints, withErrorHandling } from '@/backend/libs'
import { HttpMethod } from '@/common/types/HttpMethod'

export default 
withErrorHandling(
  withEndpoints({
    [HttpMethod.post]: postCreateAccountHandler
  })
)

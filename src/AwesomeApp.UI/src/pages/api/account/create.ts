import { postCreateAccount } from '@/backend/handlers/AccountHandlers'
import { withEndpoints, withErrorHandling } from '@/backend/libs'
import { HttpMethod } from '@/shared/models/HttpMethod'

export default 
withErrorHandling(
  withEndpoints({
    [HttpMethod.post]: postCreateAccount
  })
)

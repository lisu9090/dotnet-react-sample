import { getAccountById } from '@/backend/handlers/AccountHandlers'
import { withAuthentication, withEndpoints, withErrorHandling } from '@/backend/libs'
import { HttpMethod } from '@/shared/HttpMethod'

export default 
withErrorHandling(
  withAuthentication(
    withEndpoints({
      [HttpMethod.get]: getAccountById
    })
  )
)

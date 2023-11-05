import { getCurrentAccount } from '@/backend/handlers/AccountHandlers'
import { withAuthentication, withEndpoints, withErrorHandling } from '@/backend/libs'
import { HttpMethod } from '@/shared/models/HttpMethod'

export default 
withErrorHandling(
  withAuthentication(
    withEndpoints({
      [HttpMethod.get]: getCurrentAccount
    })
  )
)

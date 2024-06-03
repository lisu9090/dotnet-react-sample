import { getAccountsList } from '@/backend/handlers/AccountHandlers'
import { withAuthentication, withEndpoints, withErrorHandling } from '@/backend/libs'
import { HttpMethod } from '@/common/types/HttpMethod'

export default 
withErrorHandling(
  withAuthentication(
    withEndpoints({
      [HttpMethod.get]: getAccountsList
    })
  )
)

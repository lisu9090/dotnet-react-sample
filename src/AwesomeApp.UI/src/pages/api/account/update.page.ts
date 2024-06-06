import { putUpdateAccount } from '@/backend/handlers/AccountHandlers'
import { withErrorHandling, withEndpoints, withResourceAuthorization, ResourceRequestAuthorization } from '@/backend/libs'
import { HttpMethod } from '@/common/types'
import { AccountRole } from '@/common/types/account'

const endpointAuthorization: ResourceRequestAuthorization = (req, session) =>
  (session.user.role === AccountRole.User && session.user.id === req.body.id) ||
  session.user.role === AccountRole.Admin

export default 
withErrorHandling(
  withResourceAuthorization(
    endpointAuthorization,
    withEndpoints({
      [HttpMethod.put]: putUpdateAccount
    })
  )
)
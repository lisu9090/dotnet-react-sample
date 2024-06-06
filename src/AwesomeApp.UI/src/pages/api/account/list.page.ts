import { getAccountsList } from '@/backend/handlers/AccountHandlers'
import { withEndpoints, withErrorHandling, withRoleAuthorization } from '@/backend/libs'
import { HttpMethod } from '@/common/types/HttpMethod'
import { AccountRole } from '@/common/types/account'

export default 
withErrorHandling(
  withRoleAuthorization(
    [AccountRole.Admin],
    withEndpoints({
      [HttpMethod.get]: getAccountsList
    })
  )
)

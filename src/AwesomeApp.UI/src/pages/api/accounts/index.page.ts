import { getAccountsHandler } from '@/backend/handlers/AccountHandlers'
import { withEndpoints, withErrorHandling, withRoleAuthorization } from '@/backend/libs'
import { HttpMethod } from '@/common/types/HttpMethod'
import { AccountRole } from '@/common/types/account'

/**
 * Secured API endpoint which provides paginated queries over Accounts
 */
export default
  withErrorHandling(
    withEndpoints({
      [HttpMethod.get]: withRoleAuthorization(
        [AccountRole.Admin],
        getAccountsHandler
      )
    })
  )

import { deleteAccountHandler } from '@/backend/handlers/AccountHandlers'
import { withEndpoints, withErrorHandling, withRoleAuthorization } from '@/backend/libs'
import { HttpMethod } from '@/common/types/HttpMethod'
import { AccountRole } from '@/common/types/account'

/**
 * Secured API endpoint wich allows to delete Account data
 */
export default
  withErrorHandling(
    withEndpoints({
      [HttpMethod.delete]: withRoleAuthorization(
        [AccountRole.Admin],
        deleteAccountHandler
      )
    })
  )

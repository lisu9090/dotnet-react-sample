import { deleteAccountHandler } from '@/backend/handlers/AccountHandlers'
import { withCsrfTokenValidation, withEndpoints, withErrorHandling, withRoleAuthorization } from '@/backend/libs'
import { HttpMethod } from '@/common/types/HttpMethod'
import { AccountRole } from '@/common/types/account'

/**
 * Secured API endpoint which allows to delete Account data
 */
export default
  withErrorHandling(
    withEndpoints({
      [HttpMethod.delete]: withCsrfTokenValidation(
        withRoleAuthorization(
          [AccountRole.Admin],
          deleteAccountHandler
        )
      )
    })
  )

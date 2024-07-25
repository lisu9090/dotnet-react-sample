import { patchUpdateAccountHandler, postCreateAccountHandler, putUpdateAccountHandler } from '@/backend/handlers/AccountHandlers'
import { withAuthentication, withCsrfTokenValidation, withEndpoints, withErrorHandling, withRoleAuthorization } from '@/backend/libs'
import { HttpMethod } from '@/common/types/HttpMethod'
import { AccountRole } from '@/common/types/account'

export default
  withErrorHandling(
    withEndpoints({
      [HttpMethod.post]: postCreateAccountHandler,
      [HttpMethod.put]: withCsrfTokenValidation(
        withRoleAuthorization(
          [AccountRole.Admin],
          putUpdateAccountHandler
        )
      ),
      [HttpMethod.patch]: withCsrfTokenValidation(
        withAuthentication(
          patchUpdateAccountHandler
        )
      )
    })
  )

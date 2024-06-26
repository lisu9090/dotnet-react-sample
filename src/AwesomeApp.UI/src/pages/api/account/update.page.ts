import { patchUpdateAccount, putUpdateAccount } from '@/backend/handlers/AccountHandlers'
import { withErrorHandling, withEndpoints, withRoleAuthorization, withAuthentication, withCsrfTokenValidation } from '@/backend/libs'
import { HttpMethod } from '@/common/types'
import { AccountRole } from '@/common/types/account'

export default 
withErrorHandling(
  withCsrfTokenValidation(
    withEndpoints({
      [HttpMethod.put]: withRoleAuthorization(
        [AccountRole.Admin],
        putUpdateAccount
      ),
      [HttpMethod.patch]: withAuthentication(
        patchUpdateAccount
      )   
    })
  )
)
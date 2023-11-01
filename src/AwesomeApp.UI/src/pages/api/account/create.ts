import { createAccount } from '@/backend/controllers/AccountController'
import { withAuthentication, withEndpoints, withErrorHandling } from '@/backend/libs'
import { HttpMethod } from '@/shared/HttpMethod'

export default 
withErrorHandling(
  withEndpoints({
    [HttpMethod.get]: createAccount
  })
)

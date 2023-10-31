import { accountController } from '@/backend/controllers/AccountController'
import { createEndpointBuilder } from '@/backend/libs'

export default createEndpointBuilder()
  .get(accountController.createAccount)
  .build()

// endpointBuilder
//   .secured()
//   .get(async (req, res) => await accountController.createAccount(req, res))
//   .post(async (req, res) => await accountController.createAccount(req, res))
//   .build()


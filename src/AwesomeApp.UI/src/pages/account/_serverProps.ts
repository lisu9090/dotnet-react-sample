import { ensureAuthenticated, getAccount, resultNotFound, resultProps, resultRedirect } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'

export const getServerSideProps = ensureAuthenticated(async (_, session) => {
  const accountDto = await getAccount(session.user.id)

  if (!accountDto) {
    return resultNotFound()
  }

  return resultProps({ 
    account: accountDtotoAccount(accountDto) 
  })
})

import { ensureAuthenticated, getAccount, resultNotFound, resultPropsWithCsrfToken } from '@/backend/libs'
import { accountDtoToAccount } from '@/backend/mappings'

export const getServerSideProps = ensureAuthenticated(async (context, session) => {
  const accountDto = await getAccount(session.user.id)

  if (!accountDto) {
    return resultNotFound()
  }

  return resultPropsWithCsrfToken(
    context, 
    { account: accountDtoToAccount(accountDto) }
  )
})

import { ensureAuthenticated, getAccount, resultNotFound, resultProps } from '@/backend/libs'
import { accountDtoToAccount } from '@/backend/mappings'

/**
 * Provides Account Page server props
 * @param context Request context
 * @returns props
 */
export const getServerSideProps = ensureAuthenticated(async (_, session) => {
  const accountDto = await getAccount(session.user.id)

  if (!accountDto) {
    return resultNotFound()
  }

  return resultProps({ 
    account: accountDtoToAccount(accountDto) 
  })
})

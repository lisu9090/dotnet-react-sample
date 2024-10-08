import { ensureRoleAuthorized, getAccount, resultNotFound, resultPropsWithCsrfToken } from '@/backend/libs'
import { accountDtoToAccount } from '@/backend/mappings'
import { AccountRole } from '@/common/types/account'

/**
 * Provides Accounts Page server props
 * @param context Request context
 * @returns props
 */
export const getServerSideProps = ensureRoleAuthorized([AccountRole.Admin], async (context, session) => {
  const currentAccountDto = await getAccount(session.user.id)

  if (!currentAccountDto) {
    return resultNotFound()
  }

  return resultPropsWithCsrfToken(
    context,
    { 
      account: accountDtoToAccount(currentAccountDto)
    }
  )
})

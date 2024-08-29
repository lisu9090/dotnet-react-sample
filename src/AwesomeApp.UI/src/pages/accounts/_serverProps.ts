import { ensureRoleAuthorized, getAccount, resultNotFound, resultProps } from '@/backend/libs'
import { accountDtoToAccount } from '@/backend/mappings'
import { AccountRole } from '@/common/types/account'

/**
 * Prvides Accounts Page server props
 * @param context Request context
 * @returns props
 */
export const getServerSideProps = ensureRoleAuthorized([AccountRole.Admin], async (_, session) => {
  const currentAccountDto = await getAccount(session.user.id)

  if (!currentAccountDto) {
    return resultNotFound()
  }

  return resultProps({ 
    account: accountDtoToAccount(currentAccountDto)
  })
})

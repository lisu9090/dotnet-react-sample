import { ensureRoleAuthorized, getAccount, resultNotFound, resultPropsWithCsrfToken } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { AccountRole } from '@/common/types/account'

export const getServerSideProps = ensureRoleAuthorized([AccountRole.Admin], async (context, session) => {
  const currentAccountDto = await getAccount(session.user.id)

  if (!currentAccountDto) {
    return resultNotFound()
  }

  const editedAccountId = Number.parseInt(context.params?.accountId as string)

  if (!editedAccountId) {
    return resultNotFound()
  }

  const editedAccountDto = await getAccount(editedAccountId)

  return resultPropsWithCsrfToken(
    context, 
    { 
      account: accountDtotoAccount(currentAccountDto),
      accountToEdit: editedAccountDto ? accountDtotoAccount(editedAccountDto) : null 
    }
  )
})

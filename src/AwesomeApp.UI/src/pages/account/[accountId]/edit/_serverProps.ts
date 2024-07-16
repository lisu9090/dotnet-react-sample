import { ensureRoleAuthorized, getAccount, resultPropsWithCsrfToken, resultRedirect } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { PAGE_NOT_FOUND } from '@/common/consts'
import { AccountRole } from '@/common/types/account'

export const getServerSideProps = ensureRoleAuthorized([AccountRole.Admin], async (context, session) => {
  const currentAccountDto = await getAccount(session.user.id)

  if (!currentAccountDto) {
    return resultRedirect(PAGE_NOT_FOUND)
  }

  const editedAccountId = Number.parseInt(context.params?.accountId as string)

  if (!editedAccountId) {
    return resultRedirect(PAGE_NOT_FOUND)
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

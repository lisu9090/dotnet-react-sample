import { ensureRoleAuthorized, getAccount, resultPropsWithCsrfToken, resultRedirect } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { PAGE_NOT_FOUND } from '@/common/consts'
import { AccountRole } from '@/common/types/account'

export const getServerSideProps = ensureRoleAuthorized([AccountRole.Admin], async (context) => {
  const accountId = Number.parseInt(context.params?.accountId as string)

  if (!accountId) {
    return resultRedirect(PAGE_NOT_FOUND)
  }

  const accountDto = await getAccount(accountId)

  return resultPropsWithCsrfToken(
    context, 
    { account: accountDto ? accountDtotoAccount(accountDto) : null }
  )
})

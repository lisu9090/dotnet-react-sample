import { ensureAuthorized, getAccount, resultProps, resultRedirect } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { PAGE_NOT_FOUND } from '@/common/consts'
import { AccountRole } from '@/common/types/account'

export const getServerSideProps = ensureAuthorized([AccountRole.Admin], async (context, { user: { role } }) => {
  const accountId = Number.parseInt(context.params?.accountId as string)

  if (!accountId) {
    return resultRedirect(PAGE_NOT_FOUND)
  }

  const accountDto = await getAccount(accountId)

  if (!accountDto) {
    return resultRedirect(PAGE_NOT_FOUND)
  }

  return resultProps({
    account: accountDtotoAccount(accountDto)
  })
})

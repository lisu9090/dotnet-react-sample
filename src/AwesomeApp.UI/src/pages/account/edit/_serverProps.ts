import { ensureAuthenticated, getAccount, resultPropsWithCsrfToken, resultRedirect } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { PAGE_NOT_FOUND } from '@/common/consts'

export const getServerSideProps = ensureAuthenticated(async (context, session) => {
  const accountDto = await getAccount(session.user.id)

  if (!accountDto) {
    return resultRedirect(PAGE_NOT_FOUND)
  }

  return resultPropsWithCsrfToken(
    context, 
    { account: accountDtotoAccount(accountDto) }
  )
})

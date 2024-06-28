import { ensureAuthenticated, getAccount, resultProps, resultRedirect } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { PAGE_NOT_FOUND } from '@/common/consts'

export const getServerSideProps = ensureAuthenticated(async (_, session) => {
  const accountDto = await getAccount(session.user.id)

  if (!accountDto) {
    return resultRedirect(PAGE_NOT_FOUND)
  }

  return resultProps({ 
    account: accountDtotoAccount(accountDto) 
  })
})

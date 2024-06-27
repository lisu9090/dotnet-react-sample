import { ensureAuthenticated, getAccount, resultProps, resultRedirect } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { PAGE_NOT_FOUND } from '@/common/consts'
import { getCsrfToken } from 'next-auth/react'

export const getServerSideProps = ensureAuthenticated(async (context, session) => {
  const accountDto = await getAccount(session.user.id)

  if (!accountDto) {
    return resultRedirect(PAGE_NOT_FOUND)
  }

  const csrfToken = await getCsrfToken(context)

  return resultProps({
    account: accountDtotoAccount(accountDto),
    csrfToken
  })
})

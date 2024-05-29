import { ensureAuthenticated, getAccount } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'
import { AccountRole } from '@/common/types/account'

const redirectHome = {
  redirect: {
    destination: '/',
    permanent: false,
  }
}

export const getServerSideProps = ensureAuthenticated(async (context, { user: { role } }) => {
  if (role !== AccountRole.Admin) {
    return redirectHome
  }

  const accountId = Number.parseInt(context.params?.accountId as string)

  if (!accountId) {
    return redirectHome
  }

  const accountDto = await getAccount(accountId)

  if (!accountDto) {
    return redirectHome
  }

  return {
    props: {
      account: accountDtotoAccount(accountDto)
    }
  }
})

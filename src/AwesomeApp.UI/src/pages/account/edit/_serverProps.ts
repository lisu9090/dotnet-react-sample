import { ensureAuthorized, getAccount } from '@/backend/libs'
import { accountDtotoAccount } from '@/backend/mappings'

export const getServerSideProps = ensureAuthorized(async (_, { user: { id: accountId } }) => {
  const accountDto = await getAccount(accountId)

  if (!accountDto) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      account: accountDtotoAccount(accountDto)
    }
  }
})

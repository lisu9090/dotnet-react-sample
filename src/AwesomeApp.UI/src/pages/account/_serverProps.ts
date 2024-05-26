import { ensureAuthorized, getAccount } from '@/backend/libs';
import { accountDtotoAccount } from '@/backend/mappings';

export const getServerSideProps = ensureAuthorized(async (_, session) => {
  const accountDto = await getAccount(session.user!.id)

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

import { ensureAuthorized, getAccount } from '@/backend/libs';
import { toAccount } from '@/backend/mappings';

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
      account: toAccount(accountDto)
    }
  }
})

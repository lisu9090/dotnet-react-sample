import { getAccount, resultProps } from '@/backend/libs'
import { accountDtoToAccount } from '@/backend/mappings'
import { Account } from '@/common/types/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

type Props = {
  account?: Account;
}

/**
 * Provides Home Page server props
 * @param context request context
 * @returns props
 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)

  if (!session) {
    return resultProps<Props>()
  }

  const accountDto = await getAccount(session.user.id)

  return resultProps<Props>({ 
    account: accountDto ? accountDtoToAccount(accountDto) : undefined
  })
}
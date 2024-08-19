import { resultProps, resultRedirect } from '@/backend/libs'
import { PAGE_ACCOUNT } from '@/common/consts'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)

  if (session) {
    return resultRedirect(PAGE_ACCOUNT)
  }

  return resultProps()
}
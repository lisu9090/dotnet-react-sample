import { resultProps, resultRedirect } from '@/backend/libs'
import { PAGE_ACCOUNT } from '@/common/consts'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getCsrfToken, getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const session = await getSession(context)

  if (session) {
    return resultRedirect(PAGE_ACCOUNT)
  }

  const csrfToken = await getCsrfToken(context)

  return resultProps({ csrfToken })
}
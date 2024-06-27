import { resultPropsWithAuthCsrfToken, resultRedirect } from '@/backend/libs'
import { PAGE_ACCOUNT } from '@/common/consts'
import { AuthCsrfToken } from '@/common/types'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AuthCsrfToken>> {
  const session = await getSession(context)

  if (session) {
    return resultRedirect(PAGE_ACCOUNT)
  }

  return resultPropsWithAuthCsrfToken(context, {})
}
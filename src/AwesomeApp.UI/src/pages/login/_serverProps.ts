import { PAGE_ACCOUNT } from '@/common/consts'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: PAGE_ACCOUNT,
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
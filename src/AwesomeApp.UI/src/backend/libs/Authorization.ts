import { QUERY_RETURN_URL } from '@/common/consts';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export function ensureAuthorized<T>(
  getServerSideProps?: (context: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<T> | Promise< GetServerSidePropsResult<T>>
): (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: `/login?${QUERY_RETURN_URL}=${context.resolvedUrl}`,
          permanent: false,
        }
      }
    }
  
    if (!getServerSideProps) {
      return {
        props: { } as T
      }
    }

    return await getServerSideProps(context, session)
  }
}
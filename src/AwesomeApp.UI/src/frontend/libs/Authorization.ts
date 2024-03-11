import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export function ensureAuthorized<T>(
  getServerSideProps?: (context: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<T>
): (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }
  
    if (!getServerSideProps) {
      return {
        props: { } as T
      }
    }

    return getServerSideProps(context, session)
  }
}
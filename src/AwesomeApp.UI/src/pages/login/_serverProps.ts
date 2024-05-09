import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ }>> {
    const session = await getSession(context)
  
    if (session) {
      return {
        redirect: {
          destination: '/account',
          permanent: false,
        }
      }
    }
  
    return {
      props: { }
    }
  }
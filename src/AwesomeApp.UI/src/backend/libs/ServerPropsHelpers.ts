import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getCsrfToken } from './CsrfToken'
import { CsrfToken } from '@/common/types'
import { HttpStatusCode } from 'axios'

export const resultProps = <T>(props?: T, notFound?: boolean) => ({
  notFound,
  props: props ?? { } as T
})

export const resultNotFound = <T>() => ({
  notFound: true,
  props: { } as T
} as GetServerSidePropsResult<T>)

export const resultRedirect = (destination: string) => ({
  redirect: {
    destination: destination,
    permanent: false,
  }
})

export const resultStatusCode = <T>(context: GetServerSidePropsContext, statusCode: HttpStatusCode) => {
  context.res.statusCode = statusCode
  context.res.end()

  return {
    props: { } as T
  } as GetServerSidePropsResult<T>
}

export const resultForbidden = <T>(context: GetServerSidePropsContext) => resultStatusCode<T>(context, HttpStatusCode.Forbidden)

export async function resultPropsWithCsrfToken<T>(context: GetServerSidePropsContext, props?: T, notFound?: boolean): Promise<{ props: T & CsrfToken | CsrfToken }> {
  const authCookie = context.req.cookies['next-auth.session-token']
  
  if (!authCookie) {
    return resultProps(
      { 
        ...(props ?? {}), 
        csrfToken: undefined 
      },
      notFound
    )
  }

  const csrfToken = getCsrfToken(authCookie)

  return resultProps(
    {
      ...(props ?? {}),
      csrfToken
    },
    notFound
  )
}
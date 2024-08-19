import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getCsrfToken } from './CsrfToken'
import { CsrfToken } from '@/common/types'
import { HttpStatusCode } from 'axios'

type NotFound = { notFound: true }

export const resultProps = <T>(props?: T) => ({
  props: props ?? { } as T
})

export const resultNotFound = () => ({ notFound: true } as NotFound)

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

export async function resultPropsWithCsrfToken<T>(context: GetServerSidePropsContext, props?: T): Promise<{ props: T & CsrfToken | CsrfToken }> {
  const authCookie = context.req.cookies['next-auth.session-token']
  
  if (!authCookie) {
    return resultProps(
      { 
        ...(props ?? {}), 
        csrfToken: undefined 
      }
    )
  }

  const csrfToken = getCsrfToken(authCookie)

  return resultProps(
    {
      ...(props ?? {}),
      csrfToken
    }
  )
}
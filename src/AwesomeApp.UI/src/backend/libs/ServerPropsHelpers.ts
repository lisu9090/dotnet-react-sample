import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getCsrfToken } from './CsrfToken'
import { CsrfToken } from '@/common/types'
import { HttpStatusCode } from 'axios'

type NotFound = { notFound: true }

/**
 * Creates result props of T
 * @param props Props to be passed to component
 * @returns GetServerSidePropsResult
 */
export const resultProps = <T>(props?: T) => ({
  props: props ?? { } as T
})

/**
 * Creates not found result
 * @returns GetServerSidePropsResult
 */
export const resultNotFound = () => ({ notFound: true } as NotFound)

/**
 * Creates redirect result
 * @param destination Redirect destination
 * @returns GetServerSidePropsResult
 */
export const resultRedirect = (destination: string) => ({
  redirect: {
    destination: destination,
    permanent: false,
  }
})

/**
 * Creates result of specific status code
 * @param context GetServerSidePropsContext
 * @param statusCode HTTP status code
 * @returns GetServerSidePropsResult
 */
export const resultStatusCode = <T>(context: GetServerSidePropsContext, statusCode: HttpStatusCode) => {
  context.res.statusCode = statusCode
  context.res.end()

  return {
    props: { } as T
  } as GetServerSidePropsResult<T>
}

/**
 * Creates forbidden result
 * @param context GetServerSidePropsContext
 * @returns GetServerSidePropsResult
 */
export const resultForbidden = <T>(context: GetServerSidePropsContext) => resultStatusCode<T>(context, HttpStatusCode.Forbidden)

/**
 * Creates result containing CSRF token in props
 * @param context GetServerSidePropsContext
 * @param props Optional props
 * @returns GetServerSidePropsResult
 */
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
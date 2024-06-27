import { GetServerSidePropsContext } from 'next'
import { getCsrfToken } from './CsrfToken'
import { getCsrfToken as getAuthCsrfToken } from 'next-auth/react'
import { AuthCsrfToken, CsrfToken } from '@/common/types'

export const resultProps = <T>(props?: T) => ({
  props: props ?? { } as T
})

export const resultRedirect = (destination: string) => ({
  redirect: {
    destination: destination,
    permanent: false,
  }
})

export async function resultPropsWithAuthCsrfToken<T>(context: GetServerSidePropsContext, props?: T): Promise<{ props: T & AuthCsrfToken | AuthCsrfToken}> {
  const authCsrfToken = await getAuthCsrfToken(context)

  return resultProps({ 
    ...(props ?? {}), 
    authCsrfToken 
  })
}

export async function resultPropsWithCsrfToken<T>(context: GetServerSidePropsContext, props?: T): Promise<{ props: T & CsrfToken | CsrfToken }> {
  const authCookie = context.req.cookies['next-auth.session-token']
  
  if (!authCookie) {
    return resultProps({ 
      ...(props ?? {}), 
      csrfToken: undefined 
    })
  }

  const csrfToken = getCsrfToken(authCookie)

  return resultProps({
    ...(props ?? {}),
    csrfToken
  })
}
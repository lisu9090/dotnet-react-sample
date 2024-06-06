import { PAGE_FORBIDDEN, PAGE_LOGIN, QUERY_RETURN_URL } from '@/common/consts'
import { AccountRole } from '@/common/types/account'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { resultProps, resultRedirect } from './ServerPropsHelpers'

export type ResourceContextAuthorization = (context: GetServerSidePropsContext, session: Session) => boolean | Promise<boolean>

export function ensureAuthenticated<T>(
  getServerSideProps?: (context: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>
): (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)

    if (!session) {
      return resultRedirect(`${PAGE_LOGIN}?${QUERY_RETURN_URL}=${context.resolvedUrl}`) 
    }
  
    if (!getServerSideProps) {
      return resultProps<T>()
    }

    return await getServerSideProps(context, session)
  }
}

export function ensureRoleAuthorized<T>(
  allowedRoles: AccountRole[],
  getServerSideProps?: (context: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>
): (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> {
  return ensureAuthenticated(
    (context: GetServerSidePropsContext, session: Session) => {
      if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
        return resultRedirect(PAGE_FORBIDDEN)
      }

      if (!getServerSideProps) {
        return resultProps<T>()
      }

      return getServerSideProps(context, session)
    }
  ) 
}

export function ensureResourceAuthorized<T>(
  authorize: ResourceContextAuthorization,
  getServerSideProps?: (context: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>
): (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> {
  return ensureAuthenticated(
    async (context: GetServerSidePropsContext, session: Session) => {
      if (!await authorize(context, session)) {
        return resultRedirect(PAGE_FORBIDDEN)
      }

      if (!getServerSideProps) {
        return resultProps<T>()
      }

      return getServerSideProps(context, session)
    }
  ) 
}
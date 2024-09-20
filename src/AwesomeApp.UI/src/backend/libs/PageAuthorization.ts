import { PAGE_LOGIN, QUERY_RETURN_URL } from '@/common/consts'
import { AccountRole } from '@/common/types/account'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { resultForbidden, resultProps, resultRedirect } from './ServerPropsHelpers'

/**
 * Function type to check if user has access to particular resource
 */
export type ResourceContextAuthorization = (context: GetServerSidePropsContext, session: Session) => boolean | Promise<boolean>

/**
 * Decorates getServerSideProps function with logic that checks if user has been authenticated
 * @param getServerSideProps getServerSideProps
 * @returns Decorated getServerSideProps
 */
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

/**
 * Decorates getServerSideProps function with logic that checks if user has been authenticated and has one of specified roles
 * @param allowedRoles Roles to check against
 * @param getServerSideProps getServerSideProps
 * @returns Decorated getServerSideProps
 */
export function ensureRoleAuthorized<T>(
  allowedRoles: AccountRole[],
  getServerSideProps?: (context: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>
): (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> {
  return ensureAuthenticated(
    (context: GetServerSidePropsContext, session: Session) => {
      if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
        return resultForbidden(context)
      }

      if (!getServerSideProps) {
        return resultProps<T>()
      }

      return getServerSideProps(context, session)
    }
  ) 
}

/**
 * Decorates getServerSideProps function with logic that checks if user has been authenticated and has access to particular resource
 * @param authorize Authorization function which indicates user access
 * @param getServerSideProps getServerSideProps
 * @returns Decorated getServerSideProps
 */
export function ensureResourceAuthorized<T>(
  authorize: ResourceContextAuthorization,
  getServerSideProps?: (context: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>
): (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> {
  return ensureAuthenticated(
    async (context: GetServerSidePropsContext, session: Session) => {
      if (!await authorize(context, session)) {
        return resultForbidden<T>(context)
      }

      if (!getServerSideProps) {
        return resultProps<T>()
      }

      return getServerSideProps(context, session)
    }
  ) 
}

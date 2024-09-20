/**
 * Home page 
 */
export const PAGE_HOME = '/'

/**
 * Account details page 
 */
export const PAGE_ACCOUNT = '/account'

/**
 * Accounts list page 
 */
export const PAGE_ACCOUNTS = '/accounts'

/**
 * Edit current Account page 
 */
export const PAGE_ACCOUNT_EDIT = '/account/edit'

/**
 * Create Account page 
 */
export const PAGE_CREATE_ACCOUNT = '/create-account'

/**
 * Login page 
 */
export const PAGE_LOGIN = '/login'

/**
 * Dynamic edit Account page
 * @param accountId Account ID  
 * @returns Page path string
 */
export const pageAccountEdit = (accountId: string | number) => `/account/${accountId}/edit`

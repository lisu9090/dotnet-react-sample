import { useSnackbar } from '@/pages/_components/snackbar'
import { useSpinner } from '@/pages/_components/spinner'
import { ActionResult } from '@/shared/types'

export function useFetchWithErrorHandling<T extends any[], TResult>(
  fetcher: (...params: T) => Promise<ActionResult<TResult>>, 
  errorMessage?: string
): (...params: T) => Promise<TResult | null> {
  const { show: showSpinner, hide: hideSpinner } = useSpinner()
  const { warning, error } = useSnackbar()

  return async (...params: T) => {
    showSpinner()

    try {
      const result = await fetcher(...params)

      if (!result.success && result.errorCode) {
        warning(result.errorCode)

        return null
      }

      return result.payload
    } catch (e) {
      error(errorMessage ? errorMessage : 'Something went wrong...')

      console.error(e)

      return null
    } finally {
      hideSpinner()
    }
  }
}

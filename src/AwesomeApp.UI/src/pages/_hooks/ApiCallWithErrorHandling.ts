import { useSnackbar } from '@/frontend/components/snackbar'
import { useSpinner } from '@/frontend/components/spinner'
import { isProdEnvironment } from '@/common/libs'
import { ActionResult, ActionResultBase } from '@/common/types'

export function useCallWithErrorHandling<T extends any[]>(
  fetcher: (...params: T) => Promise<ActionResultBase>, 
  errorMessage?: string
) : (...params: T) => Promise<boolean> {
  const { show: showSpinner, hide: hideSpinner } = useSpinner()
  const { warning, error } = useSnackbar()

  return async (...params: T) => {
    showSpinner()

    try {
      const result = await fetcher(...params)

      if (!result.success && result.errorCode) {
        warning(result.errorCode)
      }

      return result.success
    } catch (e) {
      error(errorMessage ?? 'Something went wrong...')

      if (!isProdEnvironment()) {
        console.error(e)
      }

      return false
    } finally {
      hideSpinner()
    }
  }
}

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
      }

      return result.payload
    } catch (e) {
      error(errorMessage ?? 'Something went wrong...')

      if (!isProdEnvironment()) {
        console.error(e)
      }

      return null
    } finally {
      hideSpinner()
    }
  }
}

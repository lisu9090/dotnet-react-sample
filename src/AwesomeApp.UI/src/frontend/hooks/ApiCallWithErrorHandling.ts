import useSWR, { KeyedMutator } from 'swr'
import { useAppSnackbar } from './AppSnackbar'
import { useAppSpinner } from './AppSpinner'
import { isProdEnvironment } from '@/common/libs'
import { ActionResult, ActionResultBase } from '@/common/types'
import { useEffect } from 'react'

export function useCallWithErrorHandling<T extends any[]>(
  fetcher: (...params: T) => Promise<ActionResultBase>, 
  errorMessage?: string
) : (...params: T) => Promise<boolean> {
  const { show: showSpinner, hide: hideSpinner } = useAppSpinner()
  const { warning, error } = useAppSnackbar()

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

export function useSendWithErrorHandling<T extends any[], TResult>(
  fetcher: (...params: T) => Promise<ActionResult<TResult>>, 
  errorMessage?: string
): (...params: T) => Promise<TResult | null> {
  const { show: showSpinner, hide: hideSpinner } = useAppSpinner()
  const { warning, error } = useAppSnackbar()

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

export function useFetchWithErrorHandling<T, TResult>(
  fetcherParams: T,
  fetcher: (params: T) => Promise<ActionResult<TResult>>, 
  errorMessage?: string
): [TResult | null, KeyedMutator<ActionResult<TResult>> ] {
  const { show: showSpinner, hide: hideSpinner } = useAppSpinner()
  const { warning: snackbarWarning, error: snackbarError } = useAppSnackbar()

  const { data, isLoading, mutate } = useSWR(
    JSON.stringify(fetcherParams), 
    (stringifiedParams) => fetcher(JSON.parse(stringifiedParams)),
    {
      errorRetryCount: 1,
      onSuccess: (data) => {
        if (!data.success && data.errorCode) {
          snackbarWarning(data.errorCode)
        }
      },
      onError: (error) => {
        snackbarError(errorMessage ?? 'Something went wrong...')

        if (!isProdEnvironment()) {
          console.error(error)
        }
      },
    }
  )

  useEffect(
    () => isLoading ? showSpinner() : hideSpinner(),
    [isLoading, showSpinner, hideSpinner]
  )

  return [data?.payload ?? null, mutate ]
}

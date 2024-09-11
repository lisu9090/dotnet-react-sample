import useSWR, { KeyedMutator } from 'swr'
import { useAppSnackbar } from './AppSnackbar'
import { useAppSpinner } from './AppSpinner'
import { isProdEnvironment } from '@/common/libs'
import { ActionResult, ActionResultBase } from '@/common/types'
import { useEffect } from 'react'

/**
 * Wraps call to the API with Spinner usage and error handling. Primarly designed to work with endpoints which does not return any data 
 * @param caller Function to be wrapped (API call)
 * @param errorMessage Optional error message to be shown in error Snackbar 
 * @returns Function that uses caller and returns success indicator
 */
export function useCallWithErrorHandling<T extends any[]>(
  caller: (...params: T) => Promise<ActionResultBase>, 
  errorMessage?: string
) : (...params: T) => Promise<boolean> {
  const { show: showSpinner, hide: hideSpinner } = useAppSpinner()
  const { warning, error } = useAppSnackbar()

  return async (...params: T) => {
    showSpinner()

    try {
      const result = await caller(...params)

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

/**
 * Wraps call to the API with Spinner usage and error handling. Primarly designed to work with endpoints which accept and return data 
 * @param sender Function to be wrapped (API call)
 * @param errorMessage Optional error message to be shown in error Snackbar 
 * @returns Function that uses sender and returns data on success, otherwise null
 */
export function useSendWithErrorHandling<T extends any[], TResult>(
  sender: (...params: T) => Promise<ActionResult<TResult>>, 
  errorMessage?: string
): (...params: T) => Promise<TResult | null> {
  const { show: showSpinner, hide: hideSpinner } = useAppSpinner()
  const { warning, error } = useAppSnackbar()

  return async (...params: T) => {
    showSpinner()

    try {
      const result = await sender(...params)

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

/**
 * Wraps data fetching from the API with SWR, Spinner usage and error handling. Designed to work with endpoints which return data 
 * @param fetcherParams Fetcher parameters, used to detect changes and refresh data
 * @param fetcher Function to be wrapped (API call)
 * @param errorMessage Optional error message to be shown in error Snackbar 
 * @returns [Data or null, mutator to trigger data reload]
 */
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

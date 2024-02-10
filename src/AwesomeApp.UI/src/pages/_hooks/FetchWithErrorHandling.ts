import { useSnackbar } from '@/pages/_components/snackbar'
import { useSpinner } from '@/pages/_components/spinner'

export function useFetchWithErrorHandling(fetcher: any, errorMessage?: string) {
  const { show: showSpnner, hide: hideSpinner } = useSpinner()
  const { error } = useSnackbar()

  return async (data: any) => {
    showSpnner()

    try {
      return await fetcher(data)
    } catch (e: any) {
      error(errorMessage ? errorMessage : e.message)
    } finally {
      hideSpinner()
    }
  }
}

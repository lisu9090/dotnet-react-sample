import { useSpinner } from "."
import { useSnackbar } from "."

export function useFetchWithErrorHandling(fetcher: any, errorMessage?: string) {
  const { show, hide } = useSpinner()
  const { error } = useSnackbar()

  return (data: any) => {
    show()

    try {
      return fetcher(data)
    } catch (e: any) {
      error(errorMessage ? errorMessage : e)
    } finally {
      hide()
    }
  }
}

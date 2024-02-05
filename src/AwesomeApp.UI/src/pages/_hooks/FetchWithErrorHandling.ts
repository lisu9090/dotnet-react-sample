import { useSpinner } from "."
import { useSnackbar } from "."

export function useFetchWithErrorHandling(fetcher: any, errorMessage?: string) {
  const { show, hide } = useSpinner()
  const { error } = useSnackbar()

  return async (data: any) => {
    show()

    try {
      return await fetcher(data)
    } catch (e: any) {
      error(errorMessage ? errorMessage : e.message)
    } finally {
      hide()
    }
  }
}

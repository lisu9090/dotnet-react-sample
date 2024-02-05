import { useSpinner } from "@/pages/_components/spinner"
import { useSnackbar } from "."

export function useFetchWithErrorHandling() {
  const { show, hide } = useSpinner()
  const { error } = useSnackbar()

  return (fetcher: any, errorMessage?: string) => (data: any) => {
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

// Usage example
// function Test() {
//   const fetcherCreator = useFetcher()

//   const fetchAccounts = fetcherCreator(apiService.getAccountsList)

//   const result = useSWR("key", fetchAccounts)
//   return <></>
// }
import { useSpinner } from "@/pages/_components/spinner"

export function useFetcher() {
  const { show, hide } = useSpinner()

  return (fetcher: any, errorMessage?: string) => (data: any) => {
    show()

    try {
      return fetcher(data)
    } catch (e) {
      console.error(errorMessage ? errorMessage : e)
      // TODO snackbar.error(e)
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
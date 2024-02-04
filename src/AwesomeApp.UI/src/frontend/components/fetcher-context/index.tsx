import { createContext, useContext } from "react"
import { useSpinner } from "../spinner/SpinnerContext"
import { apiService } from "@/frontend/libs";
import useSWR from "swr";

type Props = {
  children?: any;
}

const context = createContext({ fetcherCreator: (fetcher: any) => (data: any) => fetcher(data) })

export function FetcherContext({ children }: Props) {
  const {show, hide} = useSpinner()

  const fetcherFunc = (fetcher: any) => (data: any) => {
    show()

    try {
      return fetcher(data)
    }
    finally {
      hide()
    }
  }

  return (
    <context.Provider value={{fetcherCreator: fetcherFunc}}>
      {children}
    </context.Provider>
  )
}

export function useFetcher() {
  return useContext(context)
}

// Usage example
// function Test() {
//   const { fetcherCreator } = useFetcher()

//   const fetchAccounts = fetcherCreator(apiService.getAccountsList)

//   const result = useSWR("dupa", fetchAccounts)
//   return <></>
// }
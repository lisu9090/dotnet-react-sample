import { createContext, useContext } from "react"
import { Spinner } from "@/frontend/components/spinner"

type Props = {
  show: () => void;
  hide: () => void;
}

const context = createContext<Props>({
  show: () => {},
  hide: () => {},
})

export function SpinnerProvider({ children }: any) {
  const value = {
    show: () => {},
    hide: () => {},
  }

  return (
    <context.Provider value={value}>
      <Spinner />
      {children}
    </context.Provider>
  )
}

export function useSpinner() {
  return useContext(context)
}
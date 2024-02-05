import { createContext, useContext, useMemo, useState } from "react"
import { Spinner } from "@/pages/_components/spinner/Spinner"

type ContextProps = {
  show: () => void;
  hide: () => void;
}

const context = createContext<ContextProps>({
  show: () => {},
  hide: () => {},
})

let callCounter = 0;

export function SpinnerProvider({ children }: any) {
  const [isShown, setIsShown] = useState<boolean>(false)

  const value = useMemo(
    () => ({
      show: () => {
        setIsShown(++callCounter > 0)
      },
      hide: () => {
        setIsShown(--callCounter > 0)

        if (callCounter < 0) {
          callCounter = 0
        }
      },
    }),
    []
  )

  return (
    <context.Provider value={value}>
      <Spinner show={isShown}/>
      {children}
    </context.Provider>
  )
}

export function useSpinner() {
  return useContext(context)
}

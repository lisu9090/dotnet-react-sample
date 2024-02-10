import { ReactElement, createContext, useContext, useMemo, useState } from "react"
import { Spinner } from "@/pages/_components/spinner/Spinner"

type Props = {
  children: any;
}

type ContextProps = {
  show: () => void;
  hide: () => void;
}

const context = createContext<ContextProps>({
  show: () => {},
  hide: () => {},
})

let callCounter = 0;

export function SpinnerProvider({ children }: Props): ReactElement {
  const [isShown, setIsShown] = useState<boolean>(false)

  const value = useMemo<ContextProps>(
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

export function useSpinner(): ContextProps {
  return useContext(context)
}

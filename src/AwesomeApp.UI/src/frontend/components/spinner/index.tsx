import { ReactElement, ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { Spinner } from './Spinner'

type ContextProps = {
  show: () => void;
  hide: () => void;
}

const context = createContext<ContextProps>({
  show: () => {},
  hide: () => {},
})

let callCounter = 0;

/**
 * Component which creates and provides Spinner context
 * @param children children
 * @returns Component
 */
export function SpinnerProvider({ children }: Readonly<{ children: ReactNode }>): ReactElement {
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

/**
 * Hook to Spinner Component
 * @returns Spinner context
 */
export function useSpinner(): ContextProps {
  return useContext(context)
}

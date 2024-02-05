import { createContext, useContext, useMemo, useState } from "react"
import { Snackbar } from "./Snackbar";

type Props = {
  children: any
}

type ContextProps = {
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
}

const context = createContext<ContextProps>({
  info: () => {},
  warning: () => {},
  error: () => {}
})

export function SnackbarProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [color, setColor] = useState<string>()

  const openSnackbar = (message: string, color: string) => {
    if (message) {
      setIsOpen(true)
      setMessage(message)
      setColor(color)
    }
  }

  const reset = () => {
    setIsOpen(false)
    setMessage('')
    setColor(undefined)
  }

  const value = useMemo<ContextProps>(
    () => ({
      info: (message) => openSnackbar(message, 'primary'),
      warning: (message) => openSnackbar(message, 'yellow'),
      error: (message) => openSnackbar(message, 'secondary')
    }),
    []
  )

  return (
    <context.Provider value={value}>
      <Snackbar
        open={isOpen}
        message={message}
        color={color}
        handleClose={reset}
      />
      {children}
    </context.Provider>
  )
}

export function useSnackbar() {
  return useContext(context)
}
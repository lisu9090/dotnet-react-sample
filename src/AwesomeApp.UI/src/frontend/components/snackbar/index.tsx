import { 
  SnackbarOrigin, 
  SnackbarProvider as SnackbarProviderNotistack,
  useSnackbar as useSnackbarNotistack 
} from 'notistack'
import { ReactElement, ReactNode, useMemo } from 'react'

type SnackbarApi = {
  success: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
}

const autoHideDuration = 3000
const anchor = {
  vertical: 'bottom', 
  horizontal: 'right'
} as SnackbarOrigin

/**
 * Component which creates and provides Snackbar context
 * @param children children
 * @returns Component
 */
export function SnackbarProvider({ children }: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <SnackbarProviderNotistack
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchor}
    >
      {children}
    </SnackbarProviderNotistack>
  )
}

/**
 * Hook to Snackbar Component
 * @returns Snackbar context
 */
export function useSnackbar(): SnackbarApi {
  const { enqueueSnackbar } = useSnackbarNotistack()

  return useMemo<SnackbarApi>(
    () => ({
      success: (message) => enqueueSnackbar(message, { variant: 'success' }),
      info: (message) => enqueueSnackbar(message, { variant: 'info' }),
      warning: (message) => enqueueSnackbar(message, { variant: 'warning' }),
      error: (message) => enqueueSnackbar(message, { variant: 'error' })
    }),
    [enqueueSnackbar]
  )
}
import { 
  SnackbarOrigin, 
  SnackbarProvider as SnackbarProviderNotistack,
  useSnackbar as useSnackbarNotistack 
} from 'notistack';
import { ReactElement, useMemo } from 'react';

type Props = {
  children: any
}

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

export function SnackbarProvider({ children }: Props): ReactElement {
  return (
    <SnackbarProviderNotistack
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchor}
    >
      {children}
    </SnackbarProviderNotistack>
  )
}

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
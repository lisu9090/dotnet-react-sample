import { ReactElement, ReactNode } from 'react'
import { Typography } from '@mui/material'

type Props = {
  children?: ReactNode;
}

/**
 * AppPage title Component
 * @param children Children nodes 
 * @returns Component
 */
export function AppPageTitle({ children }: Readonly<Props>): ReactElement {
  return (
    <Typography
      variant="h5"
      className="mb-2"
    >
      { children }
    </Typography>
  )
}
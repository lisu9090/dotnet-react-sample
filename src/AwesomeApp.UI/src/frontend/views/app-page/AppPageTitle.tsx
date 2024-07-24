import { ReactElement, ReactNode } from 'react'
import { Typography } from '@mui/material'

type Props = {
  children?: ReactNode;
}

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
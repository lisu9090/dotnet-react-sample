import { PageBox } from '@/frontend/components'
import { Typography } from '@mui/material'
import { ReactElement } from 'react'

export default function ForbiddenPage(): ReactElement {
  return (
    <PageBox>
      <Typography variant="h5">403 - Forbidden</Typography>
    </PageBox>
  )
}
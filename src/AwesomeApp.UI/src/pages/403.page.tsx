import { PAGE_HOME } from '@/common/consts'
import { PageBox } from '@/frontend/components'
import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { ReactElement } from 'react'

export default function ForbiddenPage(): ReactElement {
  return (
    <PageBox>
      <Grid container justifyContent="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">
            403 - Forbidden
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Link href={PAGE_HOME}>
            <Button
              className="w-full"
              variant="outlined"
            >
              Return to home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </PageBox>
  )
}
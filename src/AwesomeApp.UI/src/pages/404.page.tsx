import { PAGE_HOME } from '@/common/consts'
import { PageBox } from '@/frontend/components'
import { Button, Container, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { ReactElement } from 'react'

export default function NotFoundPage(): ReactElement {
  return (
    <Container className="h-full" maxWidth="md">
      <Grid
        container
        className="h-full"
        direction="column"
        justifyContent="center"
      >
        <PageBox>
          <Grid container justifyContent="space-between">
            <Grid item xs={4}>
              <Typography variant="h5">
                404 - Not found
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
      </Grid>

    </Container>
  )
}
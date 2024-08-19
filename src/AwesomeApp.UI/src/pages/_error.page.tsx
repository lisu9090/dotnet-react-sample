import { PAGE_HOME } from '@/common/consts'
import { PageBox } from '@/frontend/components'
import { Button, Container, Grid, Typography } from '@mui/material'
import { HttpStatusCode } from 'axios'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { ReactElement } from 'react'

type Props = {
  statusCode: number;
}

function ErrorPage({ statusCode }: Readonly<Props>): ReactElement {
  const getErrorMessage = () => {
    switch (statusCode) {
      case HttpStatusCode.NotFound:
        return 'Not found (404)'
      case HttpStatusCode.Forbidden:
        return 'Forbidden (403)'
      default:
        return 'Something went wrong' + statusCode ? ` (${statusCode})` : ''
    }
  }

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
                {getErrorMessage()}
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

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => ({
  statusCode: res ? res.statusCode : err ? err.statusCode : HttpStatusCode.NotFound
})

export default ErrorPage

import { PAGE_HOME } from '@/common/consts'
import { PageBox } from '@/frontend/components'
import { Button, Container, Grid, Typography } from '@mui/material'
import { HttpStatusCode } from 'axios'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { ReactElement } from 'react'
import { Trans } from 'react-i18next'

type Props = {
  statusCode: number;
}

/**
 * Generic error Page Component
 * @param statusCode HTTP status code
 * @returns Page Component 
 */
function ErrorPage({ statusCode }: Readonly<Props>): ReactElement {
  const getErrorMessageTranslation = () => {
    switch (statusCode) {
      case HttpStatusCode.NotFound:
        return <Trans>Not found (404)</Trans>
      case HttpStatusCode.Forbidden: 
        return <Trans>Forbidden (403)</Trans>
      default: 
        return <Trans>Something went wrong ({{statusCode}})</Trans>
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
              <Typography variant="h5">{getErrorMessageTranslation()}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Link href={PAGE_HOME}>
                <Button
                  className="w-full"
                  variant="outlined"
                >
                  <Trans>Return to home</Trans>
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

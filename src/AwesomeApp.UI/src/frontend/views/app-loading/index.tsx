import { PageBox } from '@/frontend/components'
import { Container, Grid } from '@mui/material'
import { ReactElement } from 'react'

/**
 * App loading view Component
 * @returns Component
 */
export function AppLoading(): ReactElement {
  return (
    <Grid 
      className="h-full"
      container
      direction="column"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <PageBox>AwesomeApp is loading...</PageBox>
      </Container>
    </Grid>
  )
}
import styles from './styles.module.css'
import { ReactElement } from 'react'
import { Container, Grid } from '@mui/material'
import { Footer, PageBox } from '@/frontend/components'
import { AppNavBar } from '../app-nav-bar'

export function AppPage({ children }: any): ReactElement {
  return (
    <Grid 
      className={styles.appPage}
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
      <AppNavBar />
      <Container className="mt-6 mb-6" maxWidth="md" >
        <PageBox>{ children }</PageBox>
      </Container>
      <Footer content="AwesomeApp, 2024 - App footer" />
    </Grid>
  )
}
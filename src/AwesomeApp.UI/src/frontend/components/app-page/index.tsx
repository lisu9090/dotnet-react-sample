import styles from './styles.module.css'
import { AppNavBar } from '../app-nav-bar'
import { Footer } from '../footer'
import { PageBox } from '../page-box'
import { ReactElement } from 'react'
import { Container, Grid } from '@mui/material'

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
      <Container className="mt-12 mb-6" maxWidth="md" >
        <PageBox>{ children }</PageBox>
      </Container>
      <Footer />
    </Grid>
  )
}
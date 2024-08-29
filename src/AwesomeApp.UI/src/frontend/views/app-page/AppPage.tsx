import styles from './styles.module.css'
import { ReactElement, ReactNode } from 'react'
import { Container, Grid } from '@mui/material'
import { Footer, PageBox } from '@/frontend/components'
import { AppNavBar } from '../app-nav-bar'
import { Account } from '@/common/types/account'

type Props = {
  account?: Account;
  children?: ReactNode;
}

/**
 * General app layout Component
 * @param account User account data
 * @param children Children nodes
 * @returns Component
 */
export function AppPage({ account, children }: Readonly<Props>): ReactElement {
  return (
    <Grid 
      className={styles.appPage}
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
      <AppNavBar account={account} />
      <Container className="my-6" maxWidth="md" >
        <PageBox>{ children }</PageBox>
      </Container>
      <Footer content="AwesomeApp, 2024 - App footer" />
    </Grid>
  )
}
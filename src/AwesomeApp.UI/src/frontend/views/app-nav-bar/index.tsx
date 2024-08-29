import styles from './styles.module.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { Logo } from './Logo'
import { Account, AccountRole } from '@/common/types/account'
import { PAGE_ACCOUNT, PAGE_ACCOUNTS } from '@/common/consts'
import { UserMenu } from './UserMenu'
import { Button, Grid } from '@mui/material'
import Link from 'next/link'

type Props = {
  account?: Account;
}

/**
 * Navigation bar Component
 * @param account User account data 
 * @returns Component
 */
export function AppNavBar({ account }: Readonly<Props>) {
  const showForRole = (...roles: AccountRole[]) => !!account && (!roles.length || roles.includes(account.accountRole))

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

          <Grid 
            container 
            direction="row"
            columnGap={1}
          >
            {showForRole() && (
              <Link href={PAGE_ACCOUNT}>
                <Button className={styles.navBarButton} color="inherit">Account dashboard</Button>
              </Link>
            )}
            {showForRole(AccountRole.Admin) && (
              <Link href={PAGE_ACCOUNTS}>
                <Button className={styles.navBarButton} color="inherit">Manage accounts</Button>
              </Link>
            )}
          </Grid>

          <UserMenu account={account} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

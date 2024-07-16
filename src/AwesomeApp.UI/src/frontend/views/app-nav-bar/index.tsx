import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { Logo } from './Logo'
import { Account, AccountRole } from '@/common/types/account'
import { PAGE_ACCOUNT } from '@/common/consts'
import { UserMenu } from './UserMenu'
import { Button, Grid } from '@mui/material'
import Link from 'next/link'

type Props = {
  account?: Account;
}

export function AppNavBar({ account }: Readonly<Props>) {
  const showForRole = (...roles: AccountRole[]) => !!account && (!roles.length || roles.includes(account.accountRole))

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

          <Grid container direction="row">
            {showForRole() && (
              <Link href={PAGE_ACCOUNT}>
                <Button color="inherit">Account</Button>
              </Link>
            )}
          </Grid>

          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

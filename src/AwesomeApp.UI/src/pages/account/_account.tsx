import { Account, AccountRole, CustomerType } from '@/common/types/account'
import { Button, Grid, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { logoutUser } from '@/frontend/libs'
import { useRouter } from 'next/router'
import { PAGE_ACCOUNT_EDIT, PAGE_HOME } from '@/common/consts'
import Link from 'next/link'
import { getCsrfToken } from 'next-auth/react'
import { useCallWithErrorHandling } from '@/frontend/hooks'
import { AppPage } from '@/frontend/views'

type Props = { 
  account: Account;
}

function useLogoutUserWithErrorHandling() {
  return useCallWithErrorHandling(logoutUser)
}

export default function AccountPage({ account }: Readonly<Props>): ReactElement {
  const router = useRouter()
  const tryLogout = useLogoutUserWithErrorHandling()

  const roleName = AccountRole[account.accountRole]
  const customerTypeName = CustomerType[account.customerType]
  const dateOfBirth = new Date(account.dateOfBirth)

  const logout = async () => {
    const authCsrfToken = await getCsrfToken()
    const result = await tryLogout(authCsrfToken)

    if (result) {
      router.push(PAGE_HOME)
    }
  }

  return (
    <AppPage account={account}>
      <Typography
        variant="h5"
        className="mb-2"
      >
        Account Details
      </Typography>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Typography variant="h6">Email</Typography>
        <span className="mb-2">{account.email}</span>
        <Typography variant="h6">Full name</Typography>
        <span className="mb-2">{account.fullName}</span>
        <Typography variant="h6">Date of birth</Typography>
        <span className="mb-2">{dateOfBirth.toLocaleDateString()}</span>
        <Typography variant="h6">Number of vechicles</Typography>
        <span className="mb-2">{account.vehiclesNumber}</span>
        <Typography variant="h6">Customer type</Typography>
        <span className="mb-2">{customerTypeName}</span>
        <Typography variant="h6">Account role</Typography>
        <span className="mb-2">{roleName}</span>
      </Grid>
      <Grid
        className="mt-2"
        item
        container
        alignItems="stretch"
        justifyContent="space-between"
      >
        <Grid item xs={3}>
          <Link href={PAGE_HOME}>
            <Button 
              className="w-full"
              variant="outlined"
              color="secondary"
            >
              Return to home
            </Button>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link href={PAGE_ACCOUNT_EDIT}>
            <Button 
              className="w-full"
              variant="outlined"
              color="secondary"
            >
              Edit account
            </Button>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Button
            className="w-full"
            type="submit"
            variant="outlined"
            color="warning"
            onClick={logout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </AppPage>
  )
}
